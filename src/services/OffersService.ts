import { BaseService } from "@/services/BaseService";
import { Offers } from "@/Models/Offers";

export class OffersService extends BaseService<Offers> {
  public getBaseUrl(): string {
    return `${this.actor}/offers`;
  }
}
