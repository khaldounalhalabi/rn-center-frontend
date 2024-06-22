import { BaseService } from "@/services/BaseService";
import { Subscriptions } from "@/Models/Subscriptions";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class SubscriptionsService extends BaseService<Subscriptions> {
  public getBaseUrl(): string {
    return `${this.actor}/subscriptions`;
  }

  public async getAllSubscriptions(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Subscriptions>> {
    const res = await GET<Subscriptions>(`subscriptions`, {
      page: page,
      search: search,
      sort_col: sortCol,
      sort_dir: sortDir,
      per_page: per_page,
      ...params,
    });
    return await this.errorHandler(res);
  }
}