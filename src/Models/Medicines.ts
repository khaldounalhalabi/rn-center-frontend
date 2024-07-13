import { Clinic } from "@/Models/Clinic";

export interface Medicine {
  id?: number;
  name: string;
  description?: string;
  clinic_id: number;
  clinic?: Clinic;
}