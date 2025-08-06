import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";

import {
  GetSubmissionListSuccess,
  DeleteSubmissionForRequest,
  DeleteSubmissionSuccess,
} from "@/shared/types/forAPI/SubmissionType";

export class SubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SubmissionError";
  }
}

export const fetch_all_submissions =
  async (): Promise<GetSubmissionListSuccess> => {
    const token = localStorage.getItem("token");
    let res: Response;

    try {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/submission/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw new SubmissionError("Failed to fetch submission list");
    }

    if (!res.ok) {
      const errorData = await res.json();
      throw new SubmissionError(
        errorData.message || "Failed to fetch submission list"
      );
    }

    return (await res.json()) as GetSubmissionListSuccess;
  };

export const delete_submission = async (
  submission_id: number
): Promise<DeleteSubmissionSuccess> => {
  const token = localStorage.getItem("token");
  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/submission/delete/${submission_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new SubmissionError("Failed to delete submission");
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw new SubmissionError(
      errorData.message || "Failed to delete submission"
    );
  }

  return (await res.json()) as DeleteSubmissionSuccess;
};

export const fetch_my_submissions = async (): Promise<
  GetSubmissionListSuccess | AuthError | AuthValidateError
> => {
  const token = localStorage.getItem("token");
  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/submission/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new SubmissionError("Failed to fetch user submissions");
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw new SubmissionError(
      errorData.message || "Failed to fetch user submissions"
    );
  }

  return (await res.json()) as GetSubmissionListSuccess;
};
