import { BaseService } from "@/services/BaseService";
import { AllName, Service } from "@/Models/Service";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class ServiceService extends BaseService<ServiceService, Service>() {
  public getBaseUrl(): string {
    return `${this.role}/services`;
  }

  public async getClinicService(
    clinicId: number | undefined,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    headers?: Record<string, any>,
    params?: object,
  ): Promise<ApiResponse<Service[]>> {
    const res = await GET<Service[]>(
      `${this.role}/clinics/${clinicId}/services`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      headers,
    );
    return await this.errorHandler(res);
  }

  public async getAllName(): Promise<ApiResponse<AllName[]>> {
    const res = await GET<AllName[]>(
      `${this.role}/services/names`,

      this.headers,
    );
    return await this.errorHandler(res);
  }
}
