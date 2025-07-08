'use client';

import React, { type FC, useEffect, useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '../Modal';
import { Button } from '../../Button';
import { FloatingInput } from '../../Input/FloatingInput';
import { user_update_password } from '@/shared/hooks/api/useUser';
import { UpdatePasswordSuccess } from '@/shared/types/forAPI/UserType';
import styles from './index.module.css';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<UpdatePasswordSuccess | null>(null);

  const mutation = useMutation({
    mutationFn: ({ current, next }: { current: string; next: string }) =>
      user_update_password(current, next),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Password changed successfully!');
      onClose();
    },
    onError: (err: any) => {
      setLocalError(err.message || 'Failed to change password.');
      toast.error(localError);
    },
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentPwd('');
      setNewPwd('');
      setConfirm('');
      setLocalError(null);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (newPwd !== confirm) {
      setLocalError('New password and confirmation do not match.');
      toast.error(localError);
      return;
    }
    mutation.mutate({ current: currentPwd, next: newPwd });
  };

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
          disabled={mutation.isPending}
        />
        <FloatingInput
          type="password"
          label="New password"
          value={newPwd}
          onChange={e => setNewPwd(e.target.value)}
          required
          disabled={mutation.isPending}
        />
        <FloatingInput
          type="password"
          label="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          disabled={mutation.isPending}
        />

        <div className={styles.actions}>
          <Button type="button" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting…' : 'Submit'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
