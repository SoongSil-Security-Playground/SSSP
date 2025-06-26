'use client';

import React, { FC, useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { Button } from '../../Button';
import { user_delete } from '@/shared/hooks/api/useUser';
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
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      await user_delete();
      onClose();
      logout();
    } catch (err: any) {
      setError(err.message || 'Failed to delete account.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setConfirmText('');
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.container}>
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
          disabled={loading}
        />

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={loading || confirmText !== 'DELETE'}
          >
            {loading ? 'Deleting…' : 'Delete'}
          </Button>
        </div>

        {error && (
          <p className={styles.error}>
            <AlertCircle size={16} />
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
};