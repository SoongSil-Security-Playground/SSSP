export interface SubmissionType {
    id: number;
    user_id: number;
    challenge_id: number;
    submitted_flag: string;
    submit_time: string;
    status: number;
}

export type GetSubmissionListSuccess = SubmissionType[];

export interface DeleteSubmissionForRequest {
    submission_id: number;
}

export type DeleteSubmissionSuccess = string;