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
}

export interface StoreScheduleRequest {
  clinic_id?: number;
  hospital_id?: number;
  schedules: Schedule[] | SchedulesGroupedByDay;
}

export interface ScheduleResponse {
  clinic_id?: number;
  hospital_id?: number;
  schedules: SchedulesGroupedByDay;
}

export interface SchedulesGroupedByDay {
  saturday?: Schedule[];
  sunday?: Schedule[];
  monday?: Schedule[];
  tuesday?: Schedule[];
  wednesday?: Schedule[];
  thursday?: Schedule[];
  friday?: Schedule[];
}
