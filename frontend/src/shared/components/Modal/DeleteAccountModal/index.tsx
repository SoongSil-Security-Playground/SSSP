'use client';

import React, { FC, useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { Button } from '../../Button';
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

  const handleDelete = () => {
    // TODO: 회원 탈퇴 로직
    console.log('delete account');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setConfirmText('');
    }
  }, [isOpen]);

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
        />
        <div className={styles.actions}>
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE'}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};