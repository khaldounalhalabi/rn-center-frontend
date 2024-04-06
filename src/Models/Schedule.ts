import { Clinic } from "@/Models/Clinic";
import { Hospital } from "@/Models/Hospital";

export interface Schedule {
  id?: number;
  start_time: string;
  end_time: string;
  day_of_week:
    | "saturday"
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday";
  clinic_id?: number;
  clinic?: Clinic;
  hospital_id?: number;
  hospital?: Hospital;
}

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
  schedules:
    | {
        saturday: Schedule[];
        sunday: Schedule[];
        monday: Schedule[];
        tuesday: Schedule[];
        wednesday: Schedule[];
        thursday: Schedule[];
        friday: Schedule[];
      }
    | Schedule[];
}
