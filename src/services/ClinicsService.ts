import { BaseService } from "@/services/BaseService";
import { Clinic } from "@/models/Clinic";
import { ApiResponse } from "@/http/Response";
import { GET } from "@/http/Http";
import { RoleEnum } from "@/enums/RoleEnum";

export class ClinicsService extends BaseService<ClinicsService, Clinic>() {
  getBaseUrl(): string {
    if (this.role == RoleEnum.PUBLIC) {
      return `/clinics`;
    }
    return `${this.role}/clinics`;
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
      `${this.role}/subscriptions/${subscriptionId}/clinics`,
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
      `${this.role}/system-offers/${offerId}/clinics`,
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
