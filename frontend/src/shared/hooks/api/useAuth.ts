import { AuthValidateError } from "@/shared/types/forAPI/AuthErrorType";

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

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

// /api/v1/auth/login
// Login, {POST}

export const auth_login = async (
  username: string,
  password: string
): Promise<LoginSuccess> => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new AuthError('Invalid JSON response');
  }

  if (!res.ok) {
    const detail = (payload as any).detail;
    const msg = Array.isArray(detail)
      ? detail.map((d: any) => d.msg).join(', ')
      : (payload as any).detail || (payload as any).message || `Error ${res.status}`;
    throw new AuthError(msg);
  }

  return payload as LoginSuccess;
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

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new AuthError('Invalid JSON response');
  }

  if (!res.ok) {
    const detail = (payload as any).detail;
    const msg = Array.isArray(detail)
      ? detail.map((d: any) => d.msg).join(', ')
      : (payload as any).detail || (payload as any).message || `Error ${res.status}`;
    throw new AuthError(msg);
  }

  return payload as LogoutSuccess;
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

export const auth_check = async (): Promise<"ADMIN" | "USER"> => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/auth/auth-check`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (res.status === 401) {
    throw new AuthError("Token expired or invalid. Please login again.");
  }

  let payload: any;
  try {
    payload = await res.json();
  } catch {
    throw new AuthError("Invalid response from auth-check endpoint");
  }

  if (!res.ok) {
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : `Auth check failed with status ${res.status}`;
    throw new AuthError(message);
  }

  const { authority } = payload as { authority?: string };
  if (authority !== "ADMIN" && authority !== "USER") {
    throw new AuthError(`Unexpected authority value: ${String(authority)}`);
  }
  return authority;
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

export const auth_is_admin = async (): Promise<boolean> => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/is_admin`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const payload = await res.json();

  if (!res.ok) {
    const { message } = payload as { message: string };
    throw new AuthError(message);
  }

  return payload as IsAdminSuccess;
};
