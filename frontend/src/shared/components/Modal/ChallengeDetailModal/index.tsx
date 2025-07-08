'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useFilters } from '../../FilterPanel/FilterContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { challenge_submit } from '@/shared/hooks/api/useChallenge';
import { Modal } from '../Modal';
import { FloatingInput } from '../../Input/FloatingInput';
import { Button } from '../../Button';
import { StarRating } from '../../Rating';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import styles from './index.module.css';
import type { SubmitChallengeSuccess, DefaultChallengeContent } from '@/shared/types/forAPI/ChallengeType';

export const ChallengeDetailModal: React.FC = () => {
  const qc = useQueryClient();
  const {
    items,
    isLoading: listLoading,
    isError: listError,
    error: listErrorObj,
    selectedId,
    setSelectedId,
  } = useFilters();

  const item = useMemo<DefaultChallengeContent | undefined>(
    () => items.find((i) => i.id === selectedId!),
    [items, selectedId]
  );

  const [flagInput, setFlagInput] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const mutation = useMutation<SubmitChallengeSuccess, Error, string>({
    mutationFn: (flag) => challenge_submit(item!.id, flag),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['challenges'] });
      setSelectedId(null);
      if (data.detail) {
        toast.success(data.detail);
      }
    },
    onError: (err) => {
      toast.error(err.message || 'Flag submission failed');
    }
  });

  useEffect(() => {
    if (item) setFlagInput('');
  }, [item]);

  const handleClose = () => setSelectedId(null);

  if (!item) return null;
  if (listLoading) return <div className={styles.container}>Loading...</div>;
  if (listError) {
    toast.error(listErrorObj?.message || 'Failed to load challenges');
    return <div className={styles.container}>Error loading challenge</div>;
  }

  const isSolved = item.is_user_solved === 1;

  const handleDownload = () => {
    if (!item.file_path) return;
    const url = item.file_path;
    const filename = url.split('/').pop() ?? 'download';
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={(isSolved ? styles.solvedContainer : styles.unsolvedContainer)}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
          &times;
        </button>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.meta}>
          <StarRating rating={parseInt(item.level, 10)} />
          <span className={styles.points}>{item.points} pts</span>
          <span className={styles.categoryPill}>{item.category.toUpperCase()}</span>
        </div>
        <p className={styles.description}>{item.description}</p>
        {item.file_path ? (
          <>
            <Button className={styles.downloadBtn} onClick={handleDownload}>
              download
            </Button>
          </>
        ) :
          (
            <></>
          )
        }
        {isSolved ? (
          <>
            <div className={styles.solved}>
              <CheckCircle size={16} className={styles.solvedIcon} />
              <p>Solved!</p>
            </div>
          </>
        ) : (
          <form className={styles.flagForm} onSubmit={(e) => {
            e.preventDefault();
            setSubmitError(null);
            mutation.mutate(flagInput);
          }}>
            <FloatingInput
              type="text"
              label="FLAG"
              value={flagInput}
              className={styles.flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              disabled={mutation.isPending}
              required
            />
            <Button
              type="submit"
              className={styles.flagSubmit}
              disabled={mutation.isPending || !flagInput}
            >
              {mutation.isPending ? 'Submitting…' : 'Submit'}
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
