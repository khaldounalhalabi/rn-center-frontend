import { User } from "@/Models/User";

export interface AppointmentLogs {
  id: number;
  cancellation_reason: string;
  status: string;
  happen_in: string;
  appointment_id: number;
  actor_id: number;
  actor?: User;
  affected_id: number;
  affected?: User;
  created_at: string;
  updated_at: string;
  event?: string;
}