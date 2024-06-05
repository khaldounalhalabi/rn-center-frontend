import { Phone } from "@/Models/Phone";
import { Address } from "@/Models/Address";
import { Media } from "@/Models/Media";

export interface User {
  id?: number;
  first_name: string;
  middle_name: string;
  last_name: string;
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
  phones: Phone[];
  address: Address;
  password?: string;
  password_confirmation?: string;
  role?: string | role[];
}

export interface AuthResponse {
  user: User;
  token?: string;
  refresh_token?: string;
}

export interface role {
  id: number;
  name: string;
}