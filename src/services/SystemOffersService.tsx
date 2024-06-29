import { BaseService } from "@/services/BaseService";
import { SystemOffers } from "@/Models/SystemOffer";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class SystemOffersService extends BaseService<SystemOffers> {
  public getBaseUrl(): string {
    return `${this.actor}/system-offers`;
  }

  public async getSystemOffersByClinic(
    clinicId: number | undefined,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<SystemOffers[]>> {
    const res = await GET<SystemOffers[]>(
      `clinics/${clinicId}/system-offers`,
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
