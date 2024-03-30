import { BaseService } from "@/services/BaseService";
import { City } from "@/Models/City";

export class CityService extends BaseService<City> {
  public baseUrl: string = "/cities";
}
