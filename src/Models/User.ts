import { Phone } from "@/Models/Phone";
import { Address } from "@/Models/Address";
import { Media } from "@/Models/Media";
import { Clinic } from "@/Models/Clinic";

export interface User {
  id?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  full_name?: string;
  email: string;
  birth_date: string;
  age: number;
  gender: string;
  blood_group: string;
  is_blocked: boolean;
  tags: string;
  fcm_token?: null | string;
  is_archived: boolean;
  image?: Media[];
  phones?: Phone[];
  address?: Address;
  password?: string;
  password_confirmation?: string;
  role?: Role[];
  clinic?: Clinic;
  permissions?: string[];
}

export interface AuthResponse {
  user: User;
  clinic?: Clinic;
  token?: string;
  refresh_token?: string;
}

export interface Role {
  id: number;
  name: string;
}
