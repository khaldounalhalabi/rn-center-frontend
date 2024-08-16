import { Clinic } from "@/Models/Clinic";

export interface ClinicHoliday {
  id: number;
  clinic_id: number;
  start_date: string;
  end_date: string;
  reason: string;
  clinic?: Clinic;
}
