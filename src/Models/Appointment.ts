import { Clinic } from "./Clinic";
import { Customer } from "./Customer";
import { Service } from "./Service";
import { SystemOffers } from "@/Models/SystemOffer";
import { Offers } from "@/Models/Offers";
import { AppointmentLogs } from "@/Models/AppointmentLog";

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
  cancellation_reason?: string;
  appointment_unique_code: string;
  last_booked_log?: AppointmentLogs;
  last_check_in_log?: AppointmentLogs;
  last_check_out_log?: AppointmentLogs;
  last_cancelled_log?: AppointmentLogs;
  before_appointments_count?: number;
  remaining_time?: string;
}

export interface groupedByMonth {
  appointment_count: number;
  date: string;
}
