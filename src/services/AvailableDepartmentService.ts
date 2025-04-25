import { BaseService } from "@/services/BaseService";
import { AvailableDepartment } from "@/Models/AvailableDepartment";

export class AvailableDepartmentService extends BaseService<
  AvailableDepartmentService,
  AvailableDepartment
>() {
  public getBaseUrl(): string {
    return `${this.role}/available-departments`;
  }
}
