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

export interface ClinicHoliday {
  id: number;
  start_date: string;
  end_date: string;
  reason: string;
  clinic_id: number;
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  from: string;
  to: string;
}

export interface BookedDate {
  date: string;
  times: TimeSlot[];
}

export interface AvailableTime {
  booked_times: BookedDate[];
  clinic_schedule: Record<string, ClinicScheduleEntry[]>; // Record<string, T> represents an object with string keys and values of type T
  clinic_holidays: ClinicHoliday[];
}
