import { BaseService } from "@/services/BaseService";
import { Department } from "@/Models/Departments";

export class DepartmentsService extends BaseService<
  DepartmentsService,
  Department
>() {
  public getBaseUrl(): string {
    return `${this.role}/available-departments`;
  }
}
