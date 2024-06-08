import { Customer } from "@/Models/Customer";
import { Clinic } from "@/Models/Clinic";

export interface PatientProfiles {
  id: number;
  customer_id: number;
  clinic_id: number;
  medical_condition: string;
  note: string;
  updated_at: string;
  other_data: string;
  customer: Customer;
  clinic: Clinic;
}