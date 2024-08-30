import { Subscriptions } from "@/Models/Subscriptions";
import { Clinic } from "@/Models/Clinic";

export interface ClinicSubscription {
  id: number;
  start_time: string;
  end_time: string;
  status: string;
  deduction_cost: number;
  subscription_id: number;
  clinic_id: number;
  remaining: string;
  type: string;
  clinic?: Clinic;
  subscription?: Subscriptions;
  is_paid: boolean;
}
