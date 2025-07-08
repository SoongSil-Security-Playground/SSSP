import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";

import {
  CreateNoticeForRequest,
  CreateNoticeSuccess,
  DeleteNoticeSuccess,
  GetNoticeListSuccess,
  UpdateNoticeForRequest,
  UpdateNoticeSuccess,
} from "@/shared/types/forAPI/NoticeType";

export class NoticeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoticeError";
  }
}

// /api/v1/admin/notice
// Create Notice, {POST}

export const admin_notice = async (title: string, content: string) => {
  const token = localStorage.getItem("token");
  const form = new URLSearchParams({
    title,
    content,
  }).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/notice`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  return (await res.json()) as
    | CreateNoticeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/admin/notice
// Update Notice, {PATCH}

export const admin_notice_update = async (
  notice_id: number,
  title: string,
  content: string
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/notice?notice_id=${notice_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
      } satisfies UpdateNoticeForRequest),
    }
  );

  return (await res.json()) as
    | UpdateNoticeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/admin/notice
// Delete Notice, {DELETE}

export const admin_notice_delete = async (notice_id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/notice?notice_id=${notice_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as
    | DeleteNoticeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/notice
// Get All Notice, {GET}

export const notice_get_all = async (): Promise<GetNoticeListSuccess> => {
  const token = localStorage.getItem('token');
  let res: Response;

  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/notice`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (networkErr: any) {
    throw new NoticeError(`Network error: ${networkErr.message}`);
  }

  if (res.status === 401) {
    throw new NoticeError("Token expired or invalid. Please login again.");
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new NoticeError("Invalid JSON response from server");
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    ("detail" in payload || "message" in payload)
  ) {
    const errObj = payload as { detail?: string; message?: string };
    const msg = errObj.detail ?? errObj.message ?? `Error ${res.status}`;
    throw new NoticeError(msg);
  }

  if (!res.ok) {
    throw new NoticeError(`Error ${res.status}`);
  }

  return payload as GetNoticeListSuccess;
};
