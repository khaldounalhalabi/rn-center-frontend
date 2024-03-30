import { Phone } from "@/Models/Phone";
import { Address } from "@/Models/Address";
import { City } from "@/Models/City";

export interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  blood_group: string;
  is_blocked: boolean;
  tags: string;
  fcm_token: null | string;
  is_archived: boolean;
  image: null | string;
  phones: Phone[];
  address: Address;
}

export interface AuthResponse {
  user: User;
  token?: string;
  refresh_token?: string;
}
