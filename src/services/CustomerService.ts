import { BaseService } from "@/services/BaseService";
import { Customer, Recent } from "@/Models/Customer";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";
import { Appointment } from "@/Models/Appointment";

export class CustomerService extends BaseService<Customer> {
  public getBaseUrl(): string {
    return `${this.actor}/customers`;
  }

  public async getAdminCustomerLastVisit(
    customerId: number,
    clinicId: number,
  ): Promise<ApiResponse<Appointment>> {
    const res = await GET<Appointment>(
      `${this.actor}/customers/${customerId}/clinics/${clinicId}/last-appointment`,
    );
    return await this.errorHandler(res);
  }

  public async getDoctorCustomerLastVisit(
    customerId: number,
  ): Promise<ApiResponse<Appointment>> {
    const res = await GET<Appointment>(
      `${this.actor}/customers/${customerId}/last-appointment`,
    );
    return await this.errorHandler(res);
  }

  public async getClinicCustomer(
    clinicId: number | undefined,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    headers?: Record<string,any>,
    params?: object,
  ): Promise<ApiResponse<Customer[]>> {
    const res = await GET<Customer[]>(
      `${this.actor}/clinics/${clinicId}/customers`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
        headers,
    );
    return await this.errorHandler(res);
  }

  public async getRecent(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Recent>> {
    const res = await GET<Recent>(
      `${this.actor}/customers/recent`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      this.headers,
    );
    return await this.errorHandler(res);
  }
}