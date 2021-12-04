import {UserRoles} from "../models/user.entity";

export class RegisterUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRoles;
}