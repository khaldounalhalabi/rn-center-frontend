import { Clinic } from "./Clinic";
import { Customer } from "./Customer";
import { Service } from "./Service";
import { User } from "@/Models/User";

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
  device_type: string;
  appointment_sequence: string;
  customer: Customer;
  clinic: Clinic;
  service: Service;
}

export interface AppointmentLogs {
  id: number;
  cancellation_reason: string;
  status: string;
  happen_in: string;
  appointment_id: number;
  actor_id: number;
  actor?: User;
  affected_id: number;
  affected?: User;
  created_at: string;
  updated_at: string;
}
