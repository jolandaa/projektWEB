export interface LoginUserModel {
  email: string;
  password: string
}

export interface User {
  email: string;
  role: number;
  username: string;
  firstname: string;
  lastname: string;
  status: string;
  token: string;
  user_id: number;
  school_id?: number;
  teacher_profile?: TeacherProfile,
  parent_profile?: ParentProfile
}

export const UserRoles = {
  SystemAdmin: 1,
  Admin: 2,
  Teacher: 3,
  Parent: 4
}


export interface TeacherProfile {
  "teacher_id": number,
  "user_id": number,
  "date_of_start": string,
  "school_id": number,
  "mobile_no": number,
  "monthly_salary": number,
  "father_name": string,
  "gender": string,
  "date_of_birth": string,
  "education": string,
  "experience": string
}

export interface ParentProfile {
  parent_id: number;
  school_id: number;
  user_id: number;
}
