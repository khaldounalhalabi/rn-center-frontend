import { RoleEnum } from "@/enum/RoleEnum";
import GenderEnum from "@/enum/GenderEnum";
import AttendanceLog from "@/Models/AttendanceLog";
import { Clinic } from "@/Models/Clinic";

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
  attendance_by_date?: AttendanceLog[];
  clinic?: Clinic;
}

export interface AuthResponse {
  user: User;
  token?: string;
  refresh_token?: string;
}
