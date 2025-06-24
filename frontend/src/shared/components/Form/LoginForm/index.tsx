'use client';

import React, { type FC, useState } from 'react';
import { FloatingInput } from '../../Input/FloatingInput';
import { Button } from '../../Button';
import styles from './index.module.css';

export type LoginFormProps = {
  /** 로그인 성공 시 호출 */
  onSuccess?: () => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 로직 (API 호출 등)
    console.log('login with', { email, password });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FloatingInput
        label="Email"
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <FloatingInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="primary"
        className={styles.submitBtn}
      >
        LogIn
      </Button>
    </form>
  );
};