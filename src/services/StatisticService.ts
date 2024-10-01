import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";
import {AdminStatistics, Statistics, StatisticsPublic} from "@/Models/Statistics";

export class StatisticService extends BaseService<Statistics> {
  getBaseUrl(): string {
    return `${this.actor}/statistics`;
  }

  public async doctorIndexPageStatistics(): Promise<ApiResponse<Statistics>> {
    const res = await GET<Statistics>(`${this.actor}/statistics/index-page`);
    return await this.errorHandler(res);
  }

  public async adminIndexPageStatistics(): Promise<
    ApiResponse<AdminStatistics>
  > {
    const res = await GET<AdminStatistics>(`${this.actor}/statistics/index`);
    return await this.errorHandler(res);
  }
  public async getStatistics(): Promise<
      ApiResponse<StatisticsPublic>
  > {
    const res = await GET<StatisticsPublic>(`statistics`);
    return await this.errorHandler(res);
  }
}