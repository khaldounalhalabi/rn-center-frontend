import { User } from "@/Models/User";
import { Address } from "@/Models/Address";
import { Media } from "@/Models/Media";

export interface Customer {
  id: number;
  medical_condition?: string;
  user_id: number;
  user: User;
}

export interface AddOrUpdateCustomer {
  id: number;
  medical_condition?: string;
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  gender: string;
  blood_group: string;
  tags: string;
  image?: Media[];
  phone_numbers: string[];
  address?: Address;
  password?: string;
  password_confirmation?: string;
  other_data?:string
}