import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class StatisticService extends BaseService<any> {
  getBaseUrl(): string {
    return `${this.actor}/statistics`;
  }

  public async doctorIndexPageStatistics(): Promise<
    ApiResponse<{
      total_this_month: number;
      total_online_this_month: number;
      total_upcoming: number;
      total_cancelled_this_month: number;
    }>
  > {
    const res = await GET<{
      total_this_month: number;
      total_online_this_month: number;
      total_upcoming: number;
      total_cancelled_this_month: number;
    }>("doctor/statistics/index-page");
    return await this.errorHandler(res);
  }
}
