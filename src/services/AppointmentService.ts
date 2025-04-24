import { BaseService } from "@/services/BaseService";
import { Appointment, groupedByMonth } from "@/Models/Appointment";
import { ApiResponse } from "@/Http/Response";
import { GET, POST, PUT } from "@/Http/Http";
import { AvailableTime } from "@/Models/AvailableTime";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatusEnum";

export class AppointmentService extends BaseService<Appointment> {
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

  public async getAvailableTimesClinic(): Promise<ApiResponse<AvailableTime>> {
    const res = await GET<AvailableTime>(`${this.role}/available-times`);
    return await this.errorHandler(res);
  }

  public async allGroupedByMonth(
    year: string,
  ): Promise<ApiResponse<groupedByMonth>> {
    const res = await GET<groupedByMonth>(
      `${this.role}/appointments/all/group-by-month?year=${year}`,
    );
    return await this.errorHandler(res);
  }

  public async completedGroupedByMonthCopy(
    year: string,
  ): Promise<ApiResponse<groupedByMonth>> {
    const res = await GET<groupedByMonth>(
      `${this.role}/appointments/completed/group-by-month?year=${year}`,
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

  public async updateDate(
    appointmentId: number,
    data: { date: string },
  ): Promise<ApiResponse<Appointment>> {
    const res = await PUT<Appointment>(
      `${this.role}/appointments/${appointmentId}/update-date`,
      data,
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

  public async exportExcel() {
    return await GET<any>(`${this.role}/appointments/export`);
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

  public async getClinicTodayAppointments(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Appointment[]>> {
    const res = await GET<Appointment[]>(
      `doctor/appointments/today`,
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

  public async customerCancelAppointment(appointmentId: number) {
    return this.errorHandler(
      await GET<Appointment>(`/customer/appointments/${appointmentId}/cancel`),
    );
  }

  public async getByCode(code: string) {
    return this.errorHandler(
      await GET<Appointment>(`/appointments/${code}/get-by-code`),
    );
  }
}
