// src/components/Modal/ChangePasswordModal.tsx
'use client';

import React, { FC, useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { Button } from '../../Button';
import { FloatingInput } from '../../Input/FloatingInput';
import styles from './index.module.css';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 비밀번호 변경 로직
    console.log('change password', { current, newPwd, confirm });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setCurrent('');
      setNewPwd('');
      setConfirm('');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Change Password</h2>
        <FloatingInput
          type="password"
          label="Current password"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          required
        />
        <FloatingInput
          type="password"
          label="New Password"
          value={newPwd}
          onChange={e => setNewPwd(e.target.value)}
          required
        />
        <FloatingInput
          type="password"
          label="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <div className={styles.actions}>
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
};
