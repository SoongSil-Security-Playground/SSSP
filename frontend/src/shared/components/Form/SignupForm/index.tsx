'use client';

import React, { type FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FloatingInput } from '../../Input/FloatingInput';
import { Button } from '../../Button';
import { LogIn } from 'lucide-react';
import styles from './index.module.css';
import { auth_register } from '@/shared/hooks/api/useAuth';
import { RegisterSuccess } from '@/shared/types/forAPI/AuthType';
import { AuthError, AuthValidateError } from '@/shared/types/forAPI/AuthErrorType';

export type SignupFormProps = {
  onSuccess?: () => void;
};

function isValidateError(e: AuthError | AuthValidateError): e is AuthValidateError {
  return Array.isArray((e as AuthValidateError).detail);
}

export const SignupForm: FC<SignupFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation<
    RegisterSuccess,
    Error,
    { username: string; email: string; password: string }
  >({
    mutationFn: async ({ username, email, password }) => {
      const result = await auth_register(username, email, password);

      if ('id' in result) return result as RegisterSuccess;

      if (isValidateError(result)) {
        const messages = result.detail.map(d => d.msg).join(', ');
        throw new Error(messages || '입력값을 확인해주세요.');
      }

      throw new Error((result as AuthError).detail || '회원가입에 실패했습니다.');
    },

    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다! 이제 로그인해 주세요.');
      onSuccess?.();
    },

    onError: (err) => {
      toast.error(err.message || '회원가입 중 오류가 발생했습니다.');
    },
  });

  const isSubmitting = mutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmed = {
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    };

    if (!trimmed.email || !trimmed.username || !trimmed.password) {
      toast.error('모든 항목을 입력해주세요.');
      return;
    }
    mutation.mutate(trimmed);
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
        disabled={isSubmitting}
        required
      />

      <FloatingInput
        label="Username"
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        disabled={isSubmitting}
        required
      />

      <FloatingInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        disabled={isSubmitting}
        required
      />

      <Button
        type="submit"
        variant="primary"
        icon={<LogIn size={16} />}
        iconPosition="right"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing up…' : 'Sign Up'}
      </Button>
    </form>
  );
};
