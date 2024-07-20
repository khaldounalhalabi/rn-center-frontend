import { Clinic } from "./Clinic";
import { Customer } from "./Customer";
import { Service } from "./Service";
import { SystemOffers } from "@/Models/SystemOffer";
import { Offers } from "@/Models/Offers";

export interface Appointment {
  id: number;
  customer_id: number;
  clinic_id: number;
  note: string;
  service_id: number;
  extra_fees: number;
  total_cost: number;
  type: string;
  date: string;
  status: string;
  device_type?: string;
  appointment_sequence?: string;
  customer?: Customer;
  clinic?: Clinic;
  service?: Service;
  system_offers?: SystemOffers[];
  offers?: Offers[];
  discount: number;
}
