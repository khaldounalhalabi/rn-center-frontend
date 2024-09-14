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
}

export interface AdminAppointmentDeductionSummary {
  pending_appointment_deductions: number;
  done_appointment_deductions: number;
  balance: number;
}

export interface Earning {
  earnings: number;
  date: string;
}

interface X {
  xx: (prev: AppointmentDeductions | undefined) => {
    status: string;
    id?: number | undefined;
    amount?: number | undefined;
    clinic_transaction_id?: number | undefined;
  };

  xxx: (prev: AppointmentDeductions | undefined) => {
    status: string;
    id?: number | undefined;
    amount?: number | undefined;
    clinic_transaction_id?: number | undefined;
    clinic?: Clinic | undefined;
  };
}
