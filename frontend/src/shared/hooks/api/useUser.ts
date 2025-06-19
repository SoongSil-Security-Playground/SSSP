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
  UserListSuccess,
} from "@/shared/types/forAPI/UserType";

// /api/v1/user/user_list
// Get User List, {GET}

export const user_list = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user/user_list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as UserListSuccess | AuthError | AuthValidateError;
};

// /api/v1/user/update_password
// Update Password, {PUT}

export const user_update_password = async (
  cur_password: string,
  new_password: string
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user/update_password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cur_password,
        new_password,
      } satisfies UpdatePasswordForRequest),
    }
  );

  return (await res.json()) as
    | UpdatePasswordSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/user/delete
// Delete Current User, {DELETE}

export const user_delete = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as
    | DeleteCurUserSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/user
// Get User Info, {GET}

export const user_get = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await res.json()) as GetUserSuccess | AuthError | AuthValidateError;
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
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/delete_user`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id,
      } satisfies DeleteUserForRequest),
    }
  );

  return (await res.json()) as
    | DeleteUserSuccess
    | AuthError
    | AuthValidateError;
};
