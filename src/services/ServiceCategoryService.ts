import { BaseService } from "@/services/BaseService";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class ServiceCategoryService extends BaseService<
  ServiceCategoryService,
  ServiceCategory
>() {
  public getBaseUrl(): string {
    return `${this.role}/service-categories`;
  }

  public async getAllCategory(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<ServiceCategory[]>> {
    const res = await GET<ServiceCategory[]>(
      `service-categories`,
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
