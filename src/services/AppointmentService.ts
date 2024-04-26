import { BaseService } from "@/services/BaseService";
import { Appointment } from "@/Models/Appointment";

export class AppointmentService extends BaseService<Appointment> {
  public getBaseUrl(): string {
    return `${this.actor}/appointments`;
  }
}
