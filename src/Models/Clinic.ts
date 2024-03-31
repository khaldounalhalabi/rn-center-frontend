import { User } from "@/Models/User";
import { Speciality } from "@/Models/Speciality";
import { Hospital } from "@/Models/Hospital";

export interface Clinic {
  id: number;
  name: string;
  appointment_cost: number;
  user_id: number;
  working_start_year: string;
  experience_years: number;
  max_appointments: number;
  appointment_day_range: number;
  about_us?: string;
  experience?: string;
  user?: User;
  specialities?: Speciality[];
  hospital?: Hospital;
  created_at: string;
  updated_at: string;
}
