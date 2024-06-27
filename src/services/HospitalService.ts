import { Hospital } from "@/Models/Hospital";
import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class HospitalService extends BaseService<Hospital> {
  public getBaseUrl(): string {
    return `${this.actor}/hospitals`;
  }

  public async toggleStatus(hospitaltId: number): Promise<ApiResponse<any>> {
    const res = await GET<any>(
      `${this.actor}/hospitals/${hospitaltId}/toggle-status`,
      undefined,
      this.headers
    );
    return this.errorHandler(res);
  }

  public async getAllHospital(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object
  ): Promise<ApiResponse<Hospital>> {
    const res = await GET<Hospital>(
      `hospitals`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      this.headers
    );
    return await this.errorHandler(res);
  }
}
