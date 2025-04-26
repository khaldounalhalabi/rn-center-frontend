import { BaseService } from "@/services/BaseService";
import { Customer } from "@/Models/Customer";

export class PatientService extends BaseService<PatientService, Customer>() {
  public getBaseUrl(): string {
    return `${this.role}/customers`;
  }
}
