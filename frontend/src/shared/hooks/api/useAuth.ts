import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";

import {
  AuthCheckSuccess,
  IsAdminSuccess,
  LoginForRequest,
  LoginSuccess,
  LogoutSuccess,
  RegisterForRequest,
  RegisterSuccess,
  SendAuthCodeForRequest,
  SendAuthCodeSuccess,
  VerifyAuthCodeForRequest,
  VerifyAuthCodeSuccess,
} from "@/shared/types/forAPI/AuthType";

// /api/v1/auth/login
// Login, {POST}

export const auth_login = async (
  username: string,
  password: string,
  grant_type?: string | (string | null),
  scope?: string,
  client_id?: string | (string | null),
  client_secret?: string | (string | null)
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type,
        username,
        password,
        scope,
        client_id,
        client_secret,
      } satisfies LoginForRequest),
    }
  );

  return (await res.json()) as LoginSuccess | AuthValidateError;
};

// /api/v1/auth/logout
// Logout, {POST}

export const auth_logout = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (await res.json()) as LogoutSuccess | AuthError | AuthValidateError;
};

// /api/v1/auth/register
// Register, {POST}

export const auth_register = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      } satisfies RegisterForRequest),
    }
  );

  return (await res.json()) as RegisterSuccess | AuthError | AuthValidateError;
};

// /api/v1/auth/auth-check
// Auth Check, {GET}

export const auth_check = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/auth-check`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as AuthCheckSuccess | AuthError;
};

// /api/v1/auth/send-auth-code
// Send Auth Code, {POST}

export const auth_send_auth_code = async (receiver_email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/send-auth-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiver_email,
      } satisfies SendAuthCodeForRequest),
    }
  );

  return (await res.json()) as
    | SendAuthCodeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/auth/verify-auth-code
// Verify Auth Code, {POST}

export const auth_verify_auth_code = async (
  email: string,
  auth_code: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/verify-auth-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        auth_code,
      } satisfies VerifyAuthCodeForRequest),
    }
  );

  return (await res.json()) as
    | VerifyAuthCodeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/auth/is_admin
// Is Admin, {GET}

export const auth_is_admin = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/is_admin`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as IsAdminSuccess | AuthError;
};
