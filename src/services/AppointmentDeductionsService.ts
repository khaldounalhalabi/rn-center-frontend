import { BaseService } from "@/services/BaseService";
import {
  AdminAppointmentDeductionSummary,
  AppointmentDeductions,
} from "@/Models/AppointmentDeductions";
import { ApiResponse } from "@/Http/Response";
import { ClinicAppointmentDeductionSummary } from "@/Models/AppointmentDeductions";
import { GET } from "@/Http/Http";
import { Appointment } from "@/Models/Appointment";

export class AppointmentDeductionsService extends BaseService<AppointmentDeductions> {
  getBaseUrl(): string {
    return `${this.actor}/appointment-deductions`;
  }
  public async getSummary(
    params?: object
  ): Promise<ApiResponse<AdminAppointmentDeductionSummary>>;
  public async getSummary(
    params?: object
  ): Promise<ApiResponse<ClinicAppointmentDeductionSummary>>;
  public async getSummary(
    params?: object
  ): Promise<
    | ApiResponse<ClinicAppointmentDeductionSummary>
    | ApiResponse<AdminAppointmentDeductionSummary>
  > {
    let res;
    if (this.actor == "admin") {
      res = await GET<AdminAppointmentDeductionSummary>(
        `${this.actor}/appointment-deductions/summary`,
        {
          ...params,
        }
      );
      return await this.errorHandler(res);
    } else {
      res = await GET<ClinicAppointmentDeductionSummary>(
        `${this.actor}/appointment-deductions/summary`,
        {
          ...params,
        }
      );
      return await this.errorHandler(res);
    }
  }

  public async toggleStatus(
    clinicId: number
  ): Promise<ApiResponse<Appointment>> {
    const res = await GET<Appointment>(
      `${this.actor}/appointment-deductions/${clinicId}/toggle-status`
    );
    return await this.errorHandler(res);
  }

  public async getClinicAppointmentDeductions(
    clinicId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object
  ): Promise<ApiResponse<AppointmentDeductions[]>> {
    const res = await GET<AppointmentDeductions[]>(
      `${this.actor}/clinics/${clinicId}/appointment-deductions`,
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
