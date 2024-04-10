import { BaseService } from "@/services/BaseService";
import { City } from "@/Models/City";

export class AddHolidayes extends BaseService<City> {
    public getBaseUrl(): string {
        return "/admin/clinic-holidays";
    }
}