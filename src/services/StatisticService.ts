import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";
import {AdminStatistics, DoctorStatistics} from "@/Models/DoctorStatistics";

export class StatisticService extends BaseService<DoctorStatistics> {
  getBaseUrl(): string {
    return `${this.actor}/statistics`;
  }

  public async doctorIndexPageStatistics(): Promise<
    ApiResponse<DoctorStatistics>
  > {
    const res = await GET<DoctorStatistics>(`${this.actor}/statistics/index-page`);
    return await this.errorHandler(res);
  }
  public async adminIndexPageStatistics(): Promise<
      ApiResponse<AdminStatistics>
  > {
    const res = await GET<AdminStatistics>(`${this.actor}/statistics/index`);
    return await this.errorHandler(res);
  }
}