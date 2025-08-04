import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";

import {
  DeleteCurUserSuccess,
  DeleteUserForRequest,
  DeleteUserSuccess,
  GetUserSuccess,
  UpdatePasswordForRequest,
  UpdatePasswordSuccess,
  UpdateUserForRequest,
  UpdateUserSuccess,
  GetUserListSuccess,
} from "@/shared/types/forAPI/UserType";

// /api/v1/user/user_list
// Get User List, {GET}

export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

export const user_list = async (): Promise<GetUserListSuccess> => {
  const token = localStorage.getItem("token");

  let res: Response;
  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user/user_list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
  } catch (err: any) {
    throw new UserError(`Network error: ${err.message}`);
  }

  if (res.status === 401) {
    throw new UserError("Token expired or invalid. Please login again.");
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new UserError("Invalid JSON response from server");
  }

  if (!res.ok) {
    const errMsg =
      typeof payload === "object" && payload !== null && "message" in payload
        ? (payload as any).message
        : `Error ${res.status}`;
    throw new UserError(errMsg);
  }

  return payload as GetUserListSuccess;
};

// /api/v1/user/update_password
// Update Password, {PUT}

export const user_update_password = async (
  cur_password: string,
  new_password: string
): Promise<UpdatePasswordSuccess> => {
  const token = localStorage.getItem("token");
  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user/update_password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          cur_password,
          new_password,
        } as UpdatePasswordForRequest),
      }
    );
  } catch (networkErr: any) {
    throw new UserError(`Network error: ${networkErr.message}`);
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new UserError("Invalid JSON response from server");
  }

  if (typeof payload === "object" && payload !== null && "detail" in payload) {
    const { detail } = payload as { detail: string };
    throw new UserError(detail);
  }

  if (!res.ok) {
    const errObj = payload as { message?: string };
    const msg = errObj.message ?? `Error ${res.status}`;
    throw new UserError(msg);
  }

  return payload as UpdatePasswordSuccess;
};

// /api/v1/user/delete
// Delete Current User, {DELETE}

export class UserDeleteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserDeleteError";
  }
}

export const user_delete = async (): Promise<DeleteCurUserSuccess> => {
  const token = localStorage.getItem("token");
  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
  } catch (networkErr: any) {
    throw new UserDeleteError(`Network error: ${networkErr.message}`);
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new UserDeleteError("Invalid JSON response from server");
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    ("detail" in payload || "message" in payload)
  ) {
    const err = payload as { detail?: string; message?: string };
    const msg = err.detail ?? err.message ?? `Error ${res.status}`;
    if (!res.ok || err.detail || err.message) {
      throw new UserDeleteError(msg);
    }
  }

  if (!res.ok) {
    throw new UserDeleteError(`Error ${res.status}`);
  }

  return payload as DeleteCurUserSuccess;
};

// /api/v1/user
// Get User Info, {GET}

export const user_get = async (): Promise<GetUserSuccess> => {
  const token = localStorage.getItem("token");
  let res: Response;

  // 1) Network-level errors
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (networkErr: any) {
    throw new UserError(`Network error: ${networkErr.message}`);
  }

  // 2) JSON parse errors
  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new UserError("Invalid JSON response from server");
  }

  // 3) HTTP errors
  if (!res.ok) {
    const msg =
      typeof payload === "object" && payload !== null && "message" in payload
        ? (payload as any).message
        : `Error ${res.status}`;
    throw new UserError(msg as string);
  }

  // 4) Success: payload matches GetUserSuccess
  return payload as GetUserSuccess;
};

// /api/v1/user
// Update Current User, {PATCH}

export const user_update = async (contents: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      contents,
    } satisfies UpdateUserForRequest),
  });

  return (await res.json()) as
    | UpdateUserSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/admin/delete_user
// Delete Specific User, {DELETE}

export const user_delete_user = async (user_id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/delete_user?user_id=${user_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as
    | DeleteUserSuccess
    | AuthError
    | AuthValidateError;
};
