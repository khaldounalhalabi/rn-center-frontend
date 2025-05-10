import { BaseService } from "@/services/BaseService";
import { Medicine } from "@/models/Medicine";

export class MedicineService extends BaseService<MedicineService, Medicine>() {
  public getBaseUrl(): string {
    return `${this.role}/medicines`;
  }
}
