import { User } from "@/Models/User";
import { Hospital } from "@/Models/Hospital";
import { City } from "@/Models/City";

export interface Address {
  id: number;
  name: string;
  city_id: number;
  lat?: string;
  lng?: string;
  country?: string;
  addressable_id?: number;
  addressable_type?: string;
  addressable?: User | Hospital;
  city: City;
  map_iframe?:string|TrustedHTML
}
