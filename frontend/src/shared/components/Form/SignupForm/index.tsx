'use client';

import React, { type FC, useState } from 'react'
import { FloatingInput } from '../../Input/FloatingInput'
import { Button } from '../../Button'
import { LogIn } from 'lucide-react'
import styles from './index.module.css'
import { auth_register } from '@/shared/hooks/api/useAuth';
import { AuthError, AuthValidateError } from '@/shared/types/forAPI/AuthErrorType';


function isValidateError(
  error: AuthError | AuthValidateError
): error is AuthValidateError {
  return Array.isArray((error as AuthValidateError).detail);
}

export type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm: FC<SignupFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await auth_register(username, email, password);

      if ('id' in result) {
        onSuccess?.();
      } else {
        if (isValidateError(result)) {
          const messages = result.detail.map(item => item.msg).join(', ');
          setError(messages);
        } else {
          setError((result as AuthError).message || '회원가입에 실패했습니다.');
        }
      }
    } catch (err) {
      console.error('회원가입 예외:', err);
      setError('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
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
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
