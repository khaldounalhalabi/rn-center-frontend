import { User } from "@/models/User";
import TransactionTypeEnum from "@/enums/TransactionTypeEnum";
import { Appointment } from "@/models/Appointment";

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
