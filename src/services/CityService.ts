import { BaseService } from "@/services/BaseService";
import { City } from "@/Models/City";

export class CityService extends BaseService<City> {
  getBaseUrl(): string {
    return `${this.actor}/cities`;
  }
}