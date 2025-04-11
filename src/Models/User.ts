import { RoleEnum } from "@/enum/RoleEnum";

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  full_name?: string;
  email?: string;
  phone: string;
  phone_verified_at?: string;
  gender: GenderEnum;
  role: RoleEnum;
}

export interface AuthResponse {
  user: User;
  token?: string;
  refresh_token?: string;
}
