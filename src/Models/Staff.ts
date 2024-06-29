import { Clinic } from "@/Models/Clinic";
import { User } from "@/Models/User";
import { Address } from "@/Models/Address";
import { Phone } from "@/Models/Phone";

export interface Staff {
  id: 12;
  user_id: 310;
  clinic_id: 1;
  user: User;
  clinic: Clinic;
  address?: Address;
  phone_numbers?: Phone[];
  birth_date?: string;
}
