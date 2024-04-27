import { BaseService } from "@/services/BaseService";
import { Customer } from "@/Models/Customer";

export class CustomerService extends BaseService<Customer> {
  public getBaseUrl(): string {
    return `${this.actor}/customers`;
  }
}
