'use client';

import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '../Modal';
import { Button } from '../../Button';
import { user_delete } from '@/shared/hooks/api/useUser';
import { DeleteCurUserSuccess } from '@/shared/types/forAPI/UserType';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/shared/utils/AuthProvider';
import styles from './index.module.css';

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const qc = useQueryClient();
  const { logout } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [localError, setLocalError] = useState<DeleteCurUserSuccess | null>(null);

  const { mutate, status, error } = useMutation<
    DeleteCurUserSuccess,
    Error
  >({
    mutationFn: () => user_delete(),
    onSuccess: () => {
      qc.clear();
      logout();
      onClose();
    },
    onError: (err) => {
      setLocalError(err.message);
    },
  });

  useEffect(() => {
    if (isOpen) {
      setConfirmText('');
      setLocalError(null);
    }
  }, [isOpen]);

  const handleDelete = () => {
    setLocalError(null);
    mutate();
  };

  const isDeleting = status === 'pending';
  const hasError   = status === 'error';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Delete Account</h2>
        <p className={styles.message}>
          This action cannot be undone. Type “DELETE” to confirm.
        </p>

        <input
          type="text"
          placeholder="Type DELETE"
          value={confirmText}
          onChange={e => setConfirmText(e.target.value)}
          className={styles.input}
          disabled={isDeleting}
        />

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting || confirmText !== 'DELETE'}
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </Button>
        </div>

        {(localError || hasError) && (
          <p className={styles.error}>
            <AlertCircle size={16} />
            {localError ?? error?.message}
          </p>
        )}
      </div>
    </Modal>
  );
};
