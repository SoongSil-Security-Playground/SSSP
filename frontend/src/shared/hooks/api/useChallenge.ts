import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";

import {
  CreateChallengeForRequest,
  CreateChallengeSuccess,
  DeleteChallengeSuccess,
  DonwloadFileSuccess,
  GetAllChallengeSuccess,
  GetSpecChallengeSuccess,
  GetUserSolvedChallengeSuccess,
  SolveLogSuccess,
  SubmitChallengeForRequest,
  SubmitChallengeSuccess,
  UpdateChallengeForRequest,
  UpdateChallengeSuccess,
} from "@/shared/types/forAPI/ChallengeType";

export class ChallengeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChallengeError';
  }
}
// /api/v1/challenges/download/{file_path}
// Download Challenge File, {GET}

export const challenge_download_file = async (file_path: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/challenges/download/${file_path}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (await res.json()) as
    | DonwloadFileSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/challenges/get_all_challenge
// Get All Challenges, {GET}

export const challenge_get_all = async (): Promise<GetAllChallengeSuccess> => {
  const token = localStorage.getItem('token');
  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/challenges/get_all_challenge`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
  } catch (networkErr: any) {
    throw new ChallengeError(`Network error: ${networkErr.message}`);
  }

  if (res.status === 401) {
    throw new ChallengeError('Token expired or invalid. Please login again.');
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new ChallengeError('Invalid JSON response from server');
  }

  if (
    typeof payload === 'object' &&
    payload !== null &&
    ('detail' in payload || 'message' in payload)
  ) {
    const errObj = payload as { detail?: string; message?: string };
    const msg = errObj.detail ?? errObj.message ?? `Error ${res.status}`;
    throw new ChallengeError(msg);
  }

  if (!res.ok) {
    throw new ChallengeError(`Error ${res.status}`);
  }

  return payload as GetAllChallengeSuccess;
};

// /api/v1/challenges/{challenge_id}
// Get Challenge, {GET}

export const challenge_get_spec = async (challenge_id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/challenges/${challenge_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await res.json()) as
    | GetSpecChallengeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/challenges/{challenge_id}/submit
// Submit Challenge, {POST}

export const challenge_submit = async (
  challenge_id: number,
  flag: string
): Promise<SubmitChallengeSuccess> => {
  const params = new URLSearchParams();
  params.append("flag", flag)
  const token = localStorage.getItem('token');
  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/challenges/${challenge_id}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: params.toString(),
      }
    );
  } catch (networkErr: any) {
    throw new ChallengeError(`Network error: ${networkErr.message}`);
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new ChallengeError('Invalid JSON response from server');
  }

  if (!res.ok) {
    const errObj = payload as { detail?: string; message?: string };
    const msg = errObj.detail ?? errObj.message ?? `Error ${res.status}`;
    throw new ChallengeError(msg);
  }

  const result = payload as SubmitChallengeSuccess;

  if (!result.is_correct) {
    throw new ChallengeError(result.detail);
  }

  return result;
};

// /api/v1/challenges/solved/me
// Get User Solved Challenges, {GET}

export const challenge_get_user_solved = async (): Promise<GetUserSolvedChallengeSuccess> => {
  const token = localStorage.getItem('token');
  let res: Response;

  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/challenges/solved/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
  } catch (networkErr: any) {
    throw new ChallengeError(`Network error: ${networkErr.message}`);
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new ChallengeError('Invalid JSON response from server');
  }

  if (!res.ok) {
    const msg =
      typeof payload === 'object' && payload !== null && 'message' in payload
        ? (payload as any).message
        : `Error ${res.status}`;
    throw new ChallengeError(msg as string);
  }

  return payload as GetUserSolvedChallengeSuccess;
};

// /api/v1/admin/challenges
// Create Challenge, {POST}

export const challenge_create = async (
  name: string,
  description: string,
  points: string,
  category: string,
  flag: string,
  level: string,
  decay: string,
  minimum_point: string,
  is_dynamic: boolean,
  file?: string | (string | null)
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/challenges`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        points,
        category,
        flag,
        level,
        decay,
        minimum_point,
        is_dynamic,
        file,
      } satisfies CreateChallengeForRequest),
    }
  );

  return (await res.json()) as
    | CreateChallengeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/admin/challenges/{challenge_id}
// Delete Challenge, {DELETE}

export const challenge_delete = async (challenge_id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/challenges/${challenge_id}`,
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

// /api/v1/admin/challenges/{challenge_id}
// Update Challenge, {PATCH}

export const challenge_update = async (
  challenge_id: number,
  name: string,
  description: string,
  points: number,
  level: string,
  category: string,
  file: string,
  flag: string
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/challenges/${challenge_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        points,
        level,
        category,
        file,
        flag,
      } satisfies UpdateChallengeForRequest),
    }
  );

  return (await res.json()) as
    | UpdateChallengeSuccess
    | AuthError
    | AuthValidateError;
};

// /api/v1/admin/sdijvoauv2398u98wqruwojfeihjfdbj82du9gv8h
// Solve Log, {GET}

export const challenge_get_solve_log = async (challenge_id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/admin/sdijvoauv2398u98wqruwojfeihjfdbj82du9gv8h`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return (await res.json()) as SolveLogSuccess | AuthError | AuthValidateError;
};
