import { City } from "@/Models/City";

export interface JoinRequest {
  id: number;
  doctor_name: string;
  clinic_name: string;
  phone_number: string;
  city_id: number;
  city?: City;
}
