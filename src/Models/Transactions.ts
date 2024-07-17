import { User } from "@/Models/User";

export interface Transactions {
  id: number;
  type: string;
  amount: number;
  description: string;
  date: string;
  actor_id: number;
  actor?: User;
}

export interface AdminSummary {
  balance: number;
  pending_amount: number;
}
