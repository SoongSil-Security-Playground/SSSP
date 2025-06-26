import {
  GetScoreListSuccess,
  GetMyScoreSuccess,
} from "@/shared/types/forAPI/ScoringType";

// /api/v1/score
// Get All Score

export class ScoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ScoreError';
  }
}

export const get_score = async (): Promise<GetScoreListSuccess> => {
  const token = localStorage.getItem('token');
  let res: Response;

  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/score`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (networkErr: any) {
    throw new ScoreError(`Network error: ${networkErr.message}`);
  }

  if (res.status === 401) {
    throw new ScoreError('Token expired or invalid. Please login again.');
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new ScoreError('Invalid JSON response from server');
  }

  if (!res.ok) {
    const msg =
      typeof payload === 'object' && payload !== null && 'message' in payload
        ? (payload as any).message
        : `Error ${res.status}`;
    throw new ScoreError(msg as string);
  }

  return payload as GetScoreListSuccess;
};

// /api/v1/score/me
// Get My Score

export const get_my_score = async (): Promise<GetMyScoreSuccess> => {
  const token = localStorage.getItem('token');
  
  let res: Response;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACK_SERVER_URL}/score/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (networkErr: any) {
    throw new ScoreError(`Network error: ${networkErr.message}`);
  }

  if (res.status === 401) {
    throw new ScoreError('Token expired or invalid. Please login again.');
  }

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    throw new ScoreError('Invalid JSON response from server');
  }

  if (!res.ok) {
    const msg =
      typeof payload === 'object' && payload !== null && 'message' in payload
        ? (payload as any).message
        : `Error ${res.status}`;
    throw new ScoreError(msg as string);
  }

  // At this point payload is your GetMyScoreSuccess type
  return payload as GetMyScoreSuccess;
};