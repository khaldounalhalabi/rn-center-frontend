import { Clinic } from "@/Models/Clinic";
import { User } from "@/Models/User";
import { Address } from "@/Models/Address";
import { Phone } from "@/Models/Phone";

export interface Staff {
  id: number;
  user_id: number;
  clinic_id: number;
  user?: User;
  clinic?: Clinic;
  address?: Address;
  phone_numbers?: Phone[];
  birth_date?: string;
}