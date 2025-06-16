import { ServiceCategory } from "@/models/ServiceCategory";
import { BaseService } from "@/services/BaseService";

export class ServiceCategoryService extends BaseService<
  ServiceCategoryService,
  ServiceCategory
>() {
  public getBaseUrl(): string {
    return `${this.role}/service-categories`;
  }
}
