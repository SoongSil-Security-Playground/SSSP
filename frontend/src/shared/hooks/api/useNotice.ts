import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";
import { DeleteChallengeSuccess } from "@/shared/types/forAPI/ChallengeType";
import {
  CreateNoticeForRequest,
  CreateNoticeSuccess,
  GetAllNoticeSuccess,
  UpdateNoticeForRequest,
  UpdateNoticeSuccess,
} from "@/shared/types/forAPI/NoticeType";

// /api/v1/admin/notice
// Create Notice, {POST}

export const admin_notice = async (title: string, content: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/notice`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
      } satisfies CreateNoticeForRequest),
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
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/notice/${notice_id}`,
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
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/notice/${notice_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as
    | DeleteChallengeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/notice
// Get All Notice, {GET}

export const notice_get_all = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/notice`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await res.json()) as
    | GetAllNoticeSuccess
    | AuthError
    | AuthValidateError;
};
