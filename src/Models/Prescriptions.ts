import MedicinePrescription from "@/Models/MedicinePrescription";
import { Clinic } from "@/Models/Clinic";
import { Customer } from "@/Models/Customer";
import { Appointment } from "@/Models/Appointment";

export interface Prescription {
  id: number;
  clinic_id: number;
  customer_id: number;
  appointment_id?: number;
  other_data: { key: string; value: string }[];
  created_at: string;
  next_visit?: string;
  medicines?: MedicinePrescription[];
  clinic?: Clinic;
  customer?: Customer;
  appointment?: Appointment;
}
