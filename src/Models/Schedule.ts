import { Clinic } from "@/Models/Clinic";
import { Hospital } from "@/Models/Hospital";

export interface Schedule {
  id?: number;
  start_time: string;
  end_time: string;
  day_of_week: WeekDay | string;
  clinic_id?: number;
  clinic?: Clinic;
  hospital_id?: number;
  hospital?: Hospital;
}

export type WeekDay =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export interface SchedulesCollection {
  saturday: Schedule[];
  sunday: Schedule[];
  monday: Schedule[];
  tuesday: Schedule[];
  wednesday: Schedule[];
  thursday: Schedule[];
  friday: Schedule[];
  appointment_gap?: number;
}
