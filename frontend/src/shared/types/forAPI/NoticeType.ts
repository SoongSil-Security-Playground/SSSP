// notice

export interface DefaultNoticeContent {
  title: string;
  content: string;
  id: number;
  created_at: string;
}

// /api/v1/admin/notice
// Create Notice, {POST}

export interface CreateNoticeForRequest {
  title: string;
  content: string;
}

export interface CreateNoticeSuccess {
  title: string;
  content: string;
  id: number;
  created_at: string;
}

// /api/v1/admin/notice
// Update Notice, {PATCH}

export interface UpdateNoticeForParam {
  notice_id: number;
}

export interface UpdateNoticeForRequest {
  title: string;
  content: string;
}

export type UpdateNoticeSuccess = string;

// /api/v1/admin/notice
// Delete Notice, {DELETE}

export interface DeleteNoticeForRequest {
  notice_id: number;
}

export type DeleteNoticeSuccess = string;

// /api/v1/notice
// Get All Notice, {GET}

export type GetAllNoticeSuccess = DefaultNoticeContent[];
