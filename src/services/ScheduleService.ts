import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { Schedule, SchedulesCollection } from "@/Models/Schedule";
import { GET } from "@/Http/Http";

export class ScheduleService extends BaseService<
  Schedule | SchedulesCollection
> {
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
