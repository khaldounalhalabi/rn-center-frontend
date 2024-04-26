import { BaseService } from "@/services/BaseService";
import { Service } from "@/Models/Service";

export class ServiceService extends BaseService<Service> {
  public getBaseUrl(): string {
    return `${this.actor}/services`;
  }
}
