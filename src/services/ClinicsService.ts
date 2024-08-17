import { BaseService } from "@/services/BaseService";
import { Clinic } from "@/Models/Clinic";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class ClinicsService extends BaseService<Clinic> {
    public getBaseUrl(): string {
        if (this.actor == "public") {
            return `clinics`;
        } else {
            return `${this.actor}/clinics`;
        }
    }
  public async getClinicsBySubscription(
    subscriptionId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Clinic[]>> {
    const res = await GET<Clinic[]>(
      `${this.actor}/subscriptions/${subscriptionId}/clinics`,
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

  public async getClinicsBySystemOffer(
    offerId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Clinic[]>> {
    const res = await GET<Clinic[]>(
      `${this.actor}/system-offers/${offerId}/clinics`,
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
}