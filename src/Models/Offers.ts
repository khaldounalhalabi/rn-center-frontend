import { Clinic } from "@/Models/Clinic";

export interface Offers {
  id: number;
  title: string;
  value: number;
  note: string;
  start_at: string;
  end_at: string;
  is_active: boolean;
  type: string;
  clinic_id: number;
  clinic: Clinic;
}