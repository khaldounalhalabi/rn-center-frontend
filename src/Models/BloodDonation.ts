import { City } from "@/Models/City";

export interface BloodDonation {
  id: number;
  full_name: string;
  contact_phone: string;
  address: string;
  city_id: number;
  blood_group: string;
  nearest_hospital: string;
  notes: string;
  can_wait_until: string;
  city?: City;
}

export interface BloodBank {
  id: number;
  full_name: string;
  contact_phone: string;
  address: string;
  city_id: number;
  blood_group: string;
  nearest_hospital: string;
  notes: string;
  can_wait_until: string;
  city: {
    id: number;
    name: string;
  };
}
