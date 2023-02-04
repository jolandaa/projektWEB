export interface LoginUserModel {
  email: string;
  password: string
}

export interface User {
  email: string;
  role: string;
  username: string;
  firstname: string;
  lastname: string;
  status: string;
  token: string;
  user_id: string;
}

export const UserRoles = {
  SystemAdmin: '1',
  Admin: '2',
  Teacher: '3',
  Parent: '4'
}
