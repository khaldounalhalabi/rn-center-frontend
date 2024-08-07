import { ClinicHoliday } from "@/Models/ClinicHoliday";

export interface ClinicScheduleEntry {
  id: number;
  schedulable_type: string;
  schedulable_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  from: string;
  to: string;
}



export interface AvailableTime {
  booked_times: any;
  clinic_schedule: Record<string, ClinicScheduleEntry[]>;
  clinic_holidays: ClinicHoliday[];
}