import { BaseService } from "@/services/BaseService";
import { AppointmentLogs } from "@/Models/AppointmentLog";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class AppointmentLogsService extends BaseService<AppointmentLogs> {
  public getBaseUrl(): string {
    return `${this.role}/appointment-logs`;
  }

  public async getAppointmentLogs(
    appointmentId: number,
  ): Promise<ApiResponse<AppointmentLogs[]>> {
    const res = await GET<AppointmentLogs[]>(
      `${this.role}/appointments/${appointmentId}/logs`,
    );
    return await this.errorHandler(res);
  }
}
