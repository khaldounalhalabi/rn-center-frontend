import { Appointment } from "@/Models/Appointment";
import { Clinic } from "@/Models/Clinic";

export interface AppointmentDeductions {
  id: number;
  amount: number;
  status: string;
  clinic_transaction_id: number;
  appointment_id: number;
  clinic_id: number;
  date: string;
  appointment?: Appointment;
  type: string;
  clinic?: Clinic;
}

export interface ClinicAppointmentDeductionSummary {
  appointments_deductions?: number;
  subscription_cost?: number;
  total_cost?: number;
  subscription_start?: string;
  subscription_end?: string;
  clinic_balance?: number;
  balance?: number;
  done_appointment_deductions?: number;
  pending_appointment_deductions?: number;
}

export interface AdminAppointmentDeductionSummary {
  pending_appointment_deductions: number;
  done_appointment_deductions: number;
  balance: number;
}
