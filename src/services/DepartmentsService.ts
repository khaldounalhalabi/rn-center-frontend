import { BaseService } from "@/services/BaseService";
import { Department } from "@/Models/Departments";

export class DepartmentsService extends BaseService<Department> {
  public getBaseUrl(): string {
    return `${this.role}/available-departments`;
  }
}
