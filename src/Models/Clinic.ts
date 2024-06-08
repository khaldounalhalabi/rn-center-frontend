import { User } from "@/Models/User";
import { Speciality } from "@/Models/Speciality";
import { Hospital } from "@/Models/Hospital";
import { Translatable } from "@/Models/Translatable";
import { Media } from "@/Models/Media";
import { City } from "./City";
import { ClinicSubscription } from "@/Models/ClinicSubscription";

export type Clinic = {
  id: number;
  name: string;
  appointment_cost: number;
  user_id: number;
  working_start_year: string;
  experience_years: number;
  max_appointments: number;
  appointment_day_range: number;
  status?: string;
  about_us?: string;
  experience?: string;
  user: User;
  specialities?: Speciality[];
  hospital_id?: number;
  hospital?: Hospital;
  created_at: string;
  updated_at: string;
  approximate_appointment_time?: number;
  total_appointments: number;
  today_appointments_count: number;
  upcoming_appointments_count: number;
  active_subscription?: ClinicSubscription;
};

export interface AddOrUpdateClinicForm {
  name?: string | Translatable;
  appointment_cost?: number;
  max_appointments?: number;
  user?: {
    first_name?: string | Translatable;
    middle_name?: string | Translatable;
    last_name?: string | Translatable;
    email?: string;
    password?: string;
    password_confirmation?: string;
    birth_date?: string | Date;
    gender?: string;
    image?: File | any | Media[];
    photo?: Media[];
  };
  phone_numbers?: string[];
  status?: string;
  hospital_id?: number;
  speciality_ids?: number[];
  address?: {
    city_id?: number;
    name?: string | Translatable;
    map_iframe?: string;
    city?: City;
  };
  hospital?: Hospital;
  specialities?: Speciality[];
  deduction_cost?: string;
  subscription_id?: number;
  subscription_type?: string;
}
