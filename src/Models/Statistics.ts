export interface Statistics {
  total_this_month: number;
  total_online_this_month: number;
  total_cancelled_this_month: number;
  total_upcoming: number;
  total_appointments: number;
  today_appointments: number;
  upcoming_appointments: number;
  total_income_current_month: number;
  total_income_prev_month: number;
}

export interface AdminStatistics {
  total_appointments: number;
  upcoming_appointments: number;
  today_appointments: number;
  total_deductions_current_month: number;
  total_deductions_prev_month: number;
  today_registered_patients: number;
  total_patients: number;
  total_active_doctors: number;
}

export interface StatisticsPublic {
  clinics_count: number,
  success_appointments_count: number
}