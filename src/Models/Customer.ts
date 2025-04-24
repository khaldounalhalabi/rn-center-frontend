import { User } from "@/Models/User";
import { Media } from "@/Models/Media";

export interface Customer {
  id: number;
  user_id: number;
  blood_group: string;
  birth_date: string;
  age: number;
  created_at: string;
  health_status?: string;
  notes?: string;
  other_date?: { key: string; value: string }[];
  user?: User;
  attachments?: Media[];
}
