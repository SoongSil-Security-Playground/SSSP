"use client";

import React, { type FC, useState } from "react";
import { FloatingInput } from "../../Input/FloatingInput";
import { Button } from "../../Button";
import styles from "./index.module.css";
import { auth_login } from "@/shared/hooks/api/useAuth";
import { LoginSuccess } from "@/shared/types/forAPI/AuthType";
import {
  AuthValidateError,
  AuthError,
} from "@/shared/types/forAPI/AuthErrorType";

function isValidateError(
  error: AuthError | AuthValidateError
): error is AuthValidateError {
  return Array.isArray((error as AuthValidateError).detail);
}

export type LoginFormProps = {
  onSuccess: (token: string) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await auth_login(username, password);
      if ("access_token" in response) {
        const data = response as LoginSuccess;
        localStorage.setItem("token", data.access_token);
        onSuccess(data.access_token);
      } else {
        const apiError = response as AuthError | AuthValidateError;
        if (isValidateError(apiError)) {
          const messages = apiError.detail.map((item) => item.msg).join(", ");
          setError(messages);
        } else {
          setError(apiError.message || "로그인에 실패했습니다.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FloatingInput
        label="Username"
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <FloatingInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="primary" className={styles.submitBtn}>
        LogIn
      </Button>
    </form>
  );
};
