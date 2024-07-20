import { BaseService } from "@/services/BaseService";
import { Appointment } from "@/Models/Appointment";
import { ApiResponse } from "@/Http/Response";
import {GET, POST, PUT} from "@/Http/Http";
import { AvailableTime } from "@/Models/AvailableTime";

export class AppointmentService extends BaseService<Appointment> {
  public getBaseUrl(): string {
    return `${this.actor}/appointments`;
  }

  public async getAvailableTimes(
    clinicId: number
  ): Promise<ApiResponse<AvailableTime>> {
    const res = await GET<AvailableTime>(
      `${this.actor}/clinics/${clinicId}/available-times`
    );
    return await this.errorHandler(res);
  }
    public async getAvailableTimesClinic(
    ): Promise<ApiResponse<AvailableTime>> {
        const res = await GET<AvailableTime>(
            `${this.actor}/available-times`
        );
        return await this.errorHandler(res);
    }

  public async toggleStatus(
    appointmentId: number,
    data: { status: string; cancellation_reason?: string }
  ): Promise<ApiResponse<Appointment>> {
    const res = await POST<Appointment>(
      `${this.actor}/appointments/${appointmentId}/toggle-status`,
      data
    );
    return await this.errorHandler(res);
  }


    public async updateDate(
        appointmentId: number,
        data: { date:string }
    ): Promise<ApiResponse<Appointment>> {
        const res = await PUT<Appointment>(
            `${this.actor}/appointments/${appointmentId}/update-date`,
            data
        );
        return await this.errorHandler(res);
    }

  public async getClinicAppointments(
    clinicId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object
  ): Promise<ApiResponse<Appointment[]>> {
    const res = await GET<Appointment[]>(
      `${this.actor}/clinics/${clinicId}/appointments`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      this.headers
    );
    return await this.errorHandler(res);
  }

    public async exportExcel(){
        const res = await GET<any>(
            `${this.actor}/appointments/export`
        );
        return (await res);
    }

    public async getCustomerAppointments(
      customerId: number,
      page: number = 0,
      search?: string,
      sortCol?: string,
      sortDir?: string,
      per_page?: number,
      params?: object
    ): Promise<ApiResponse<Appointment[]>> {
      const res = await GET<Appointment[]>(
        `${this.actor}/customers/${customerId}/appointments`,
        {
          page: page,
          search: search,
          sort_col: sortCol,
          sort_dir: sortDir,
          per_page: per_page,
          ...params,
        },
        this.headers
      );
      return await this.errorHandler(res);
    }
   
    

}