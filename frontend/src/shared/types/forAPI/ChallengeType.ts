// challenge

export interface DefaultChallengeContent {
  name: string;
  description: string;
  points: number;
  category: string;
  id: number;
  created_at: string;
  file_path: string;
  is_user_solved: number;
  solve_count: number;
  level: string;
  flag: string;
}

// /api/v1/challenges/download/{file_path}
// Download Challenge File, {GET}

export interface DonwloadFileForRequest {
  file_path: string;
}

export type DonwloadFileSuccess = string;

// /api/v1/challenges/get_all_challenge
// Get All Challenges, {GET}

export type GetAllChallengeSuccess = DefaultChallengeContent[];

// /api/v1/challenges/{challenge_id}
// Get Challenge, {GET}

export interface GetSpecChallengeForRequest {
  challenge_id: number;
}

export interface GetSpecChallengeSuccess extends DefaultChallengeContent {}

// /api/v1/challenges/{challenge_id}/submit
// Submit Challenge, {POST}

export interface SubmitChallengeForParam {
  challenge_id: number;
}

export interface SubmitChallengeForRequest {
  flag: string;
}

export type SubmitChallengeSuccess = string;

// /api/v1/challenges/solved/me
// Get User Solved Challenges, {GET}

export type GetUserSolvedChallengeSuccess = DefaultChallengeContent[];

// /api/v1/admin/challenges
// Create Challenge, {POST}

export interface CreateChallengeForRequest {
  name: string;
  description: string;
  points: string;
  category: string;
  file?: string | (string | null);
  flag: string;
  level: string;
  decay: string;
  minimum_point: string;
  is_dynamic: boolean;
}

export interface CreateChallengeSuccess extends DefaultChallengeContent {}

// /api/v1/admin/challenges/{challenge_id}
// Delete Challenge, {DELETE}

export interface DeleteChallengeForRequest {
  challenge_id: number;
}

export interface DeleteChallengeSuccess {}

// /api/v1/admin/challenges/{challenge_id}
// Update Challenge, {PATCH}

export interface UpdateChallengeForParam {
  challenge_id: number;
}

export interface UpdateChallengeForRequest {
  name: string;
  description: string;
  points: number;
  level: string;
  category: string;
  file: string;
  flag: string;
}

export interface UpdateChallengeSuccess extends DefaultChallengeContent {}

// /api/v1/admin/sdijvoauv2398u98wqruwojfeihjfdbj82du9gv8h
// Solve Log, {GET}

export type SolveLogSuccess = string;
