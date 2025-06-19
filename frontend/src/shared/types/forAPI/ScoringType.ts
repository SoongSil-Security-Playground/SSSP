// scoring

// /api/v1/score
// Get All Score

export interface GetAllScoreList {
  username: string;
  total_score: number;
}

export type GetAllScoreLists = GetAllScoreList[];

// /api/v1/score/me
// Get My Score

export interface GetMyScore extends GetAllScoreList {}
