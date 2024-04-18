import { Speciality } from "@/Models/Speciality";
import { BaseService } from "@/services/BaseService";

export class SpecialityService extends BaseService<Speciality> {
  public getBaseUrl(): string {
    return `${this.actor}/specialities`;
  }
}
