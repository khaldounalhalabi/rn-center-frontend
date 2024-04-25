import { User } from "@/Models/User";
export interface Customer {
  id: number;
  medical_condition: string;
  user_id: number;
  user: User;
}
