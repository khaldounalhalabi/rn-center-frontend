import { User } from "@/Models/User";
import TransactionTypeEnum from "@/enum/TransactionTypeEnum";
import { Appointment } from "@/Models/Appointment";

export interface Transaction {
  id: number;
  type: TransactionTypeEnum;
  amount: number;
  description: string;
  date: string;
  actor_id: number;
  actor?: User;
  appointment_id?: number;
  appointment?: Appointment;
}
