'use client';

import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify'
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

  const mutation = useMutation<
    DeleteCurUserSuccess,
    Error
  >({
    mutationFn: () => user_delete(),
    onSuccess: () => {
      qc.clear();
      logout();
      onClose();
      toast.success('Account deleted successfully.');
    },
    onError: (err) => {
      setLocalError(err.message);
      toast.error(localError);
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
    mutation.mutate();
  };

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
          disabled={mutation.isPending}
        />

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={mutation.isPending || confirmText !== 'DELETE'}
          >
            {mutation.isPending ? 'Deleting…' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
