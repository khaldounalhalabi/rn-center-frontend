import { BaseService } from "@/services/BaseService";
import { Medicine } from "@/Models/Medicines";

export class MedicineService extends BaseService<Medicine> {
  public getBaseUrl(): string {
    return `${this.actor}/medicines`;
  }
}
