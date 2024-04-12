import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { Schedule, SchedulesCollection } from "@/Models/Schedule";
import { AuthService } from "@/services/AuthService";
import { GET } from "@/Http/Http";

export class ScheduleService extends BaseService<
  Schedule | SchedulesCollection
> {
  public static make(): ScheduleService {
    if (!this.instance) {
      this.instance = new this();
    }
    this.instance.actor = AuthService.getCurrentActor();

    this.instance.setBaseUrl(`${this.instance.actor}/schedules`);

    return this.instance;
  }

  public async getClinicSchedules(
    clinicId: number,
  ): Promise<ApiResponse<SchedulesCollection>> {
    const res = await GET(`${this.actor}/clinics/${clinicId}/schedules`);
    return (await this.errorHandler(res)) as ApiResponse<SchedulesCollection>;
  }
}
