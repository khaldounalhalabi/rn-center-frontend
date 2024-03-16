import { User } from "@/Models/User";
import { Hospital } from "@/Models/Hospital";

export interface Address {
  id: number;
  name: string;
  city: string;
  lat?: string;
  lng?: string;
  country?: string;
  addressable_id?: number;
  addressable_type?: string;
  addressable?: User | Hospital;
}
