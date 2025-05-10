import { RoleEnum } from "@/enums/RoleEnum";
import GenderEnum from "@/enums/GenderEnum";
import AttendanceLog from "@/models/AttendanceLog";
import { Clinic } from "@/models/Clinic";

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
