import { BaseService } from "@/services/BaseService";
import { City } from "@/Models/City";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class CityService extends BaseService<City> {
  getBaseUrl(): string {
    return `${this.actor}/cities`;
  }

  public async getAllCities(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object
  ): Promise<ApiResponse<City>> {
    const res = await GET<City>(
      `cities`,
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