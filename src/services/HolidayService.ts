import { BaseService } from "@/services/BaseService";
import { Holiday } from "@/Models/Holiday";

export class HolidayService extends BaseService<Holiday> {
  public getBaseUrl(): string {
    return `${this.role}/holidays`;
  }
}
