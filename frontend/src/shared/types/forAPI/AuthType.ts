// auth

// /api/v1/auth/login
// Login, {POST}

export interface LoginForRequest {
  username: string;
  password: string;
  grant_type?: string | (string | null);
  scope?: string;
  client_id?: string | (string | null);
  client_secret?: string | (string | null);
}

export interface LoginSuccess {
  access_token: string;
  token_type: string;
}

// /api/v1/auth/logout
// Logout, {POST}

export type LogoutSuccess = string;

// /api/v1/auth/register
// Register, {POST}

export interface RegisterForRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterSuccess {
  id: number;
  username: string;
  email: string;
  contents: string;
  authority: string;
}

// /api/v1/auth/auth-check
// Auth Check, {GET}

export type AuthCheckSuccess = string;

// /api/v1/auth/send-auth-code
// Send Auth Code, {POST}
// 이메일 인증 코드를 생성하고 전송하는 엔드 포인트

export interface SendAuthCodeForRequest {
  receiver_email: string;
}

export type SendAuthCodeSuccess = string;

// /api/v1/auth/verify-auth-code
// Verify Auth Code, {POST}
// 이메일 인증 코드를 검증하는 엔드포인트

export interface VerifyAuthCodeForRequest {
  email: string;
  auth_code: string;
}

export type VerifyAuthCodeSuccess = string;

// /api/v1/admin/is_admin
// IS Admin?, {GET}

export type IsAdminSuccess = string;
