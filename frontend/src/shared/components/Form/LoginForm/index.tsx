"use client";

import React, { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FloatingInput } from "../../Input/FloatingInput";
import { Button } from "../../Button";
import styles from "./index.module.css";
import { auth_login } from "@/shared/hooks/api/useAuth";
import type { LoginSuccess } from "@/shared/types/forAPI/AuthType";

type LoginFormProps = {
  onSuccess: (token: string) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<
    LoginSuccess,
    unknown,
    { username: string; password: string }
  >({
    mutationFn: ({ username, password }) => auth_login(username, password),
    onSuccess: (data) => {
      onSuccess(data.access_token);
    },
    onError: (err: any) => {
      const msg =
        err?.message ||
        err?.response?.data?.detail ||
        err?.detail ||
        "로그인에 실패했어요.";
      toast.error(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, password });
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
        disabled={mutation.isPending}
        required
      />

      <FloatingInput
        label="Password"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={mutation.isPending}
        required
      />

      <Button
        type="submit"
        variant="primary"
        className={styles.submitBtn}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in…" : "Log In"}
      </Button>
    </form>
  );
};
