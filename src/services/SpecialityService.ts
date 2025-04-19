import { Speciality } from "@/Models/Speciality";
import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";
import {RoleEnum} from "@/enum/RoleEnum";

export class SpecialityService extends BaseService<Speciality> {
  public getBaseUrl(): string {
    if (this.role == RoleEnum.PUBLIC) {
      return `/specialities`;
    } else {
      return `${this.role}/specialities`;
    }
  }

  public async getAllSpecialities(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
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
      this.headers,
    );
    return await this.errorHandler(res);
  }
}
