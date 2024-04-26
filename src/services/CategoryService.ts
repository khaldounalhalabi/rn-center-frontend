import { BaseService } from "@/services/BaseService";
import { ServiceCategory } from "@/Models/ServiceCategory";

export class CategoryService extends BaseService<ServiceCategory> {
  public getBaseUrl(): string {
    return `${this.actor}/service-categories`;
  }
}
