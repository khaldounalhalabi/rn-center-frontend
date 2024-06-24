import { BaseService } from "@/services/BaseService";
import { Service } from "@/Models/Service";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class ServiceService extends BaseService<Service> {
  public getBaseUrl(): string {
    return `${this.actor}/services`;
  }

  public async getClinicService(
    clinicId: number | undefined,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object
  ): Promise<ApiResponse<Service[]>> {
    const res = await GET<Service[]>(
      `${this.actor}/clinics/${clinicId}/services`,
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
