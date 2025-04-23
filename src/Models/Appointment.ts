import AppointmentTypeEnum from "@/enum/AppointmentTypeEnum";
import { Service } from "@/Models/Service";
import { Clinic } from "@/Models/Clinic";
import { Customer } from "@/Models/Customer";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatus";

export interface Appointment {
  id: number;
  customer_id: number;
  clinic_id: number;
  service_id: number;
  note?: string;
  extra_fees: number;
  total_cost: number;
  type: AppointmentTypeEnum;
  status: AppointmentStatusEnum;
  date_time: string;
  appointment_sequence: number;
  remaining_time: string;
  discount: number;
  service?: Service;
  clinic?: Clinic;
  customer?: Customer;
}

export interface groupedByMonth {
  appointment_count: number;
  date: string;
}
