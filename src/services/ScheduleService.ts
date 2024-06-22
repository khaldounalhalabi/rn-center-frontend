import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { Schedule, SchedulesCollection } from "@/Models/Schedule";
import { GET } from "@/Http/Http";

export class ScheduleService extends BaseService<
  Schedule | SchedulesCollection
> {
  public getBaseUrl(): string {
    return `${this.actor}/schedules`;
  }

  public async getClinicSchedules(
    clinicId: number,
  ): Promise<ApiResponse<SchedulesCollection>> {
    const res = await GET(`${this.actor}/clinics/${clinicId}/schedules`);
    return (await this.errorHandler(res)) as ApiResponse<SchedulesCollection>;
  }

  public async getDoctorSchedules(): Promise<ApiResponse<SchedulesCollection>> {
    const res = await GET(`${this.actor}/schedules`);
    return (await this.errorHandler(res)) as ApiResponse<SchedulesCollection>;
  }
}