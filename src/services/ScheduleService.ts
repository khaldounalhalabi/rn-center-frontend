import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/http/Response";
import { Schedule, SchedulesCollection } from "@/Models/Schedule";
import { GET } from "@/http/Http";

export class ScheduleService extends BaseService<
  ScheduleService,
  Schedule | SchedulesCollection
>() {
  public getBaseUrl(): string {
    return `${this.role}/schedules`;
  }

  public async getClinicSchedules(
    clinicId: number,
  ): Promise<ApiResponse<SchedulesCollection>> {
    const res = await GET(
      `${this.role}/clinics/${clinicId}/schedules`,
      undefined,
      this.headers,
    );
    return (await this.errorHandler(res)) as ApiResponse<SchedulesCollection>;
  }

  public async getDoctorSchedules(): Promise<ApiResponse<SchedulesCollection>> {
    const res = await GET(`${this.role}/schedules`, undefined, this.headers);
    return (await this.errorHandler(res)) as ApiResponse<SchedulesCollection>;
  }
}
