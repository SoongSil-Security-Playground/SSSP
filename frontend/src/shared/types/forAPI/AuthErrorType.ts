// Auth Error {401}
// 토큰이 없는데 접근했을 때

export interface AuthError {
  detail: string;
}

// 422 Error.. validate

export interface AuthValidateError {
  detail: AuthValidateContent[];
}

export interface AuthValidateContent {
  loc: [string, number];
  msg: string;
  type: string;
}
