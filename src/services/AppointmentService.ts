import { BaseService } from "@/services/BaseService";
import { Appointment } from "@/Models/Appointment";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class AppointmentService extends BaseService<Appointment> {
  public getBaseUrl(): string {
    return `${this.actor}/appointments`;
  }

  public async getAvailableTimes(
    clinicId: number,
  ): Promise<ApiResponse<AvailableTime>> {
    return await GET<AvailableTime>(
      `${this.actor}/clinics/${clinicId}/available-times`,
    );
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
    return await GET<Appointment[]>(
      `${this.actor}/clinics/${clinicId}/appointments`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
    );
  }
}
