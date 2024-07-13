import { BaseService } from "@/services/BaseService";
import { Customer } from "@/Models/Customer";

export class PatientsService extends BaseService<Customer> {
  public getBaseUrl(): string {
    return `${this.actor}/customers`;
  }
}