export interface SystemAdminUsersResponseModel {
  list: SystemAdminUsersModel[],
  success: number,
  message: string;
}

export interface SystemAdminUsersModel {
  email:string;
  first_name:string;
  last_login_date:string;
  last_name:string;
  password:string;
  role: number;
  status:string;
  user_id:number;
  username:string;
}

export interface AddSystemAdminUsersModel {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
  username: string;
}

export interface EditSystemAdminUsersModel {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
}
