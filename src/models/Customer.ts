import { User } from "@/models/User";
import { Media } from "@/models/Media";

export interface Customer {
  id: number;
  user_id: number;
  blood_group: string;
  birth_date: string;
  age: string;
  created_at: string;
  health_status?: string;
  notes?: string;
  other_data?: { key: string; value: string }[];
  user?: User;
  attachments?: Media[];
}
