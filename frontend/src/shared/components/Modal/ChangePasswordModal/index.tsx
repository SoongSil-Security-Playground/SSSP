// src/components/Modal/ChangePasswordModal.tsx
'use client';

import React, { FC, useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { Button } from '../../Button';
import { FloatingInput } from '../../Input/FloatingInput';
import { user_update_password } from '@/shared/hooks/api/useUser';
import { AlertCircle } from 'lucide-react';
import styles from './index.module.css';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPwd !== confirm) {
      setError('New password and confirmation do not match.');
      return;
    }

    setLoading(true);
    try {
      await user_update_password(currentPwd, newPwd);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentPwd('');
      setNewPwd('');
      setConfirm('');
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Change Password</h2>
        <FloatingInput
          type="password"
          label="Current password"
          value={currentPwd}
          onChange={e => setCurrentPwd(e.target.value)}
          required
          disabled={loading}
        />
        <FloatingInput
          type="password"
          label="New password"
          value={newPwd}
          onChange={e => setNewPwd(e.target.value)}
          required
          disabled={loading}
        />
        <FloatingInput
          type="password"
          label="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
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

          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit'}
          </Button>
        </div>

        {error &&
          <p className={styles.error}>
            <AlertCircle size={16} />
            {error}
          </p>
        }
      </form>
    </Modal>
  );
};