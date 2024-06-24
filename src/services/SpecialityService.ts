import { Speciality } from "@/Models/Speciality";
import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class SpecialityService extends BaseService<Speciality> {
  public getBaseUrl(): string {
    return `${this.actor}/specialities`;
  }

  public async getAllSpecialities(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object
  ): Promise<ApiResponse<Speciality>> {
    const res = await GET<Speciality>(
      `specialities`,
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
