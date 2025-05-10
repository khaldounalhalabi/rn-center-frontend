import { BaseService } from "@/services/BaseService";
import { Appointment } from "@/models/Appointment";
import { ApiResponse } from "@/http/Response";
import { GET, POST, PUT } from "@/http/Http";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";

export class AppointmentService extends BaseService<
  AppointmentService,
  Appointment
>() {
  public getBaseUrl(): string {
    return `${this.role}/appointments`;
  }

  public async getAvailableTimes(
    clinicId: number,
    date: string,
  ): Promise<ApiResponse<string[]>> {
    const res = await POST<string[]>(
      `${this.role}/clinics/available-appointments-times`,
      { date: date, clinic_id: clinicId },
    );
    return await this.errorHandler(res);
  }

  public async toggleStatus(
    appointmentId: number,
    status: AppointmentStatusEnum,
    cancellationReason?: string | undefined,
  ): Promise<ApiResponse<Appointment>> {
    const res = await PUT<Appointment>(
      `${this.role}/appointments/change-status`,
      {
        status: status,
        appointment_id: appointmentId,
        cancellation_reason: cancellationReason,
      },
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
    params?: object,
  ): Promise<ApiResponse<Appointment[]>> {
    const res = await GET<Appointment[]>(
      `${this.role}/clinics/${clinicId}/appointments`,
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

  public async getCustomerAppointments(
    customerId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Appointment[]>> {
    const res = await GET<Appointment[]>(
      `${this.role}/customers/${customerId}/appointments`,
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
