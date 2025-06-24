'use client';

import React, { type FC, useState } from 'react'
import { FloatingInput } from '../../Input/FloatingInput'
import { Button } from '../../Button'
import { LogIn } from 'lucide-react'
import styles from './index.module.css'

export type SignupFormProps = {
  /** 가입 성공 시 호출 */
  onSuccess?: () => void;
};

export const SignupForm: FC<SignupFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 가입 로직 호출 (API 등)
    console.log('signup with', { email, userId, password });
    // 가입 성공 시:
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
        label="Username"
        id="userId"
        name="userId"
        type="text"
        value={userId}
        onChange={e => setUserId(e.target.value)}
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
        icon={<LogIn size={16} />}
        iconPosition="right"
        className={styles.submitBtn}
      >
        SignUp
      </Button>
    </form>
  );
};
