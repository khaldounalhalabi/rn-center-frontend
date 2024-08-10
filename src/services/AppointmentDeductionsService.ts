import { BaseService } from "@/services/BaseService";
import {
  AdminAppointmentDeductionSummary,
  AppointmentDeductions,
} from "@/Models/AppointmentDeductions";
import { ApiResponse } from "@/Http/Response";
import { ClinicAppointmentDeductionSummary } from "@/Models/AppointmentDeductions";
import {GET, POST} from "@/Http/Http";
import { Appointment } from "@/Models/Appointment";

export class AppointmentDeductionsService extends BaseService<AppointmentDeductions> {
  getBaseUrl(): string {
    return `${this.actor}/appointment-deductions`;
  }

  public async getAdminSummary(): Promise<
    ApiResponse<AdminAppointmentDeductionSummary>
  > {
    const res = await GET<AdminAppointmentDeductionSummary>(
      `admin/appointment-deductions/summary`
    );
    return await this.errorHandler(res);
  }

  public async getDoctorSummary(): Promise<
    ApiResponse<ClinicAppointmentDeductionSummary>
  > {
    const res = await GET<ClinicAppointmentDeductionSummary>(
      `doctor/appointment-deductions/summary`
    );
    return await this.errorHandler(res);
  }
  public async getSummaryByClinicId(clinicId: number): Promise<
      ApiResponse<ClinicAppointmentDeductionSummary>
  > {
    const res = await GET<ClinicAppointmentDeductionSummary>(
        `${this.actor}/clinics/${clinicId}/appointment-deductions/summary`
    );
    return await this.errorHandler(res);
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
  public async bulkToggleStatus(
      data: { status: number, ids:number[] }
  ): Promise<ApiResponse<any>> {
    const res = await POST<any>(
        `${this.actor}/appointment-deductions/bulk/toggle-status`,
        data
    );
    return await this.errorHandler(res);
  }
}