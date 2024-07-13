import { BaseService } from "@/services/BaseService";
import { ClinicHoliday } from "@/Models/ClinicHoliday";

export class ClinicHolidayService extends BaseService<ClinicHoliday> {
  public getBaseUrl(): string {
    return `${this.actor}/clinic-holidays`;
  }
}