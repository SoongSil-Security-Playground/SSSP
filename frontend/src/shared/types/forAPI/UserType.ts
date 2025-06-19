// User

// /api/v1/user/user_list
// Get User List, {GET}

export interface UserListContent {
  id: number;
  username: string;
  email: string;
  contents: string;
  authority: string;
}

export type UserListSuccess = UserListContent[];

// /api/v1/user/update_password
// Update Password, {PUT}

export interface UpdatePasswordForRequest {
  cur_password: string;
  new_password: string;
}

export type UpdatePasswordSuccess = string;

// /api/v1/user/delete
// Delete Current User, {DELETE}

export type DeleteCurUserSuccess = string;

// /api/v1/user
// Get User Info, {GET}

export interface GetUserSuccess {
  id: number;
  username: string;
  email: string;
  contents: string;
  authority: string;
}

// /api/v1/user
// Update Current User, {PATCH}

export interface UpdateUserForRequest {
  contents: string;
}

export interface UpdateUserSuccess {
  id: number;
  username: string;
  email: string;
  contents: string;
  authority: string;
}

// /api/v1/admin/delete_user
// Delete Specific User, {DELETE}

export interface DeleteUserForRequest {
  user_id: number;
}

export type DeleteUserSuccess = string;
