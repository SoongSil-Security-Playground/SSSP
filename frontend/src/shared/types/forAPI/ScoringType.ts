// scoring

// /api/v1/score
// Get All Score

export interface ScoreListContent {
  username: string;
  total_score: number;
}

export type GetScoreListSuccess = ScoreListContent[];

// /api/v1/score/me
// Get My Score

export interface GetMyScoreSuccess extends ScoreListContent {}
