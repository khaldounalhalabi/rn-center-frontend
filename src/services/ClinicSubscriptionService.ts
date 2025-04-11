import { BaseService } from "@/services/BaseService";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import { GET } from "@/Http/Http";
import { ApiResponse } from "@/Http/Response";

export class ClinicSubscriptionService extends BaseService<ClinicSubscription> {
  public getBaseUrl(): string {
    return `${this.role}/clinic-subscriptions`;
  }

  public async getClinicSubscriptions(
    clinicId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<ClinicSubscription[]>> {
    const res = await GET<ClinicSubscription[]>(
      `${this.role}/clinics/${clinicId}/subscriptions`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      this.headers,
    );
    return await this.errorHandler(res);
  }

  public async collect(clinicSubscriptionId: number) {
    return this.errorHandler(
      await GET<boolean>(
        `admin/clinic-subscriptions/${clinicSubscriptionId}/pay`,
        undefined,
        this.headers,
      ),
    );
  }

  public async collectForThisMonth(clinicId: number) {
    return this.errorHandler(
      await GET<boolean>(
        `admin/clinics/${clinicId}/clinic-subscriptions/current/pay`,
      ),
    );
  }
}
