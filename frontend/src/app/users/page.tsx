"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthValidateError } from "@/shared/types/forAPI/AuthErrorType";
import { LoginSuccess } from "@/shared/types/forAPI/AuthType";
import { auth_login } from "@/shared/hooks/api/useAuth";

export default function UserPage() {
  const [username, setUsername] = useState<string>("mlnl");
  const [password, setPassword] = useState<string>("mlnlmlnl");

  const { mutate, data } = useMutation<
    LoginSuccess,
    AuthValidateError,
    { username: string; password: string }
  >({
    mutationFn: async ({ username, password }) => {
      const result = await auth_login(username, password);
      if ("access_token" in result) {
        return result;
      }
      throw result;
    },
    onSuccess: async (data) => {
      if ("accessToken" in data) {
        localStorage.setItem("token", data.access_token);
      }
    },
  });

  const handleLogin = () => {
    mutate({ username, password });
  };

  return (
    <div>
      <h1>Here is Users Page</h1>
      <input value={username} />
      <input value={password} />
      <div onClick={() => handleLogin()} />
    </div>
  );
}
