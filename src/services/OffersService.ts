import { BaseService } from "@/services/BaseService";
import { Offers } from "@/Models/Offers";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class OffersService extends BaseService<OffersService, Offers>() {
  public getBaseUrl(): string {
    return `${this.role}/offers`;
  }

  public async getOffersByClinic(
    clinicId: number | undefined,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Offers[]>> {
    const res = await GET<Offers[]>(
      `clinics/${clinicId}/offers`,
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
