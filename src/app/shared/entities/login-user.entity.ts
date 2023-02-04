import {User} from "../models/login-user.model";

export interface LoginUserEntity {
  success: number;
  message: string;
  user: User;
}
