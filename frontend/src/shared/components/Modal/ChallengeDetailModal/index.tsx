'use client';

import React, { type FC, useState, useEffect } from 'react';
import { type DefaultChallengeContent } from '@/shared/types/forAPI/ChallengeType';
import { Modal } from '../Modal';
import { FloatingInput } from '../../Input/FloatingInput';
import { Button } from '../../Button';
import { StarRating } from '../../Rating';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { challenge_submit } from '@/shared/hooks/api/useChallenge';
import styles from './index.module.css';

export type ChallengeDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSolve?: (id: number) => void;
  item: DefaultChallengeContent | null;
};

export const ChallengeDetailModal: FC<ChallengeDetailModalProps> = ({ isOpen, onClose, onSolve, item }) => {
  const [flagInput, setFlagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFlagInput('');
      setError(null);
      setSuccessMessage(null);
      setLoading(false);
      setSolved(item?.is_user_solved === 1);
    }
  }, [isOpen, item]);

  if (!item) return null;

  const handleDownload = () => {
    if (!item?.file_path) {
      console.error("No file path available for download.");
      return;
    }

    const url = item.file_path;
    const filename = url.split("/").pop() || "download";
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const result = await challenge_submit(item.id, flagInput);
      setSuccessMessage(result.detail);
      setSolved(true);
      onSolve?.(item.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.meta}>
          <StarRating rating={parseInt(item.level, 10)} />
          <span className={styles.points}>{item.points} pts</span>
          <span className={styles.categoryPill}>{item.category.toUpperCase()}</span>
        </div>
        <p className={styles.description}>{item.description}</p>
        <Button className={styles.downloadBtn} onClick={handleDownload}>
          download
        </Button>
        {solved ? (
          <>
            <div className={styles.solved}>
              <CheckCircle size={16} className={styles.solvedIcon} />
              <p>Solved!</p>
            </div>
            {successMessage && <p className={styles.success}>{successMessage}</p>}
          </>
        ) : (
          <form className={styles.flagForm} onSubmit={handleSubmit}>
            <FloatingInput
              type="text"
              label="FLAG"
              value={flagInput}
              className={styles.flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              disabled={loading}
              required
            />
            <Button
              type="submit"
              className={styles.flagSubmit}
              disabled={loading || !flagInput}
            >
              {loading ? 'Submitting…' : 'Submit'}
            </Button>
          </form>
        )}
      </div>
      {error && (
        <p className={styles.error}>
          <AlertCircle size={16} /> {error}
        </p>
      )}
    </Modal>
  );
};
