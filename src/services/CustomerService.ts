import { BaseService } from "@/services/BaseService";
import { Customer } from "@/Models/Customer";
import {ApiResponse} from "@/Http/Response";
import {GET} from "@/Http/Http";
import {Appointment} from "@/Models/Appointment";

export class CustomerService extends BaseService<Customer> {
  public getBaseUrl(): string {
    return `${this.actor}/customers`;
  }
  public async getCustomerLastVisit(
      customerId: number,
      clinicId:number

  ): Promise<ApiResponse<Appointment>> {
    const res = await GET<Appointment>(
        `${this.actor}/customers/${customerId}/clinics/${clinicId}/last-appointment`,
    );
    return await this.errorHandler(res);
  }
}