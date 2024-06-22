import { BaseService } from "@/services/BaseService";
import { AvailableDepartment } from "@/Models/AvailableDepartment";

export class AvailableDepartmentService extends BaseService<AvailableDepartment> {
  public getBaseUrl(): string {
    return `${this.actor}/available-departments`;
  }
}