import { BaseService } from "@/services/BaseService";
import { Clinic } from "@/Models/Clinic";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";
import {RoleEnum} from "@/enum/RoleEnum";

export class ClinicsService extends BaseService<Clinic> {
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
