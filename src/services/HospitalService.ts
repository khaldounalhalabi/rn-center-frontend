import { Hospital } from "@/Models/Hospital";
import { BaseService } from "@/services/BaseService";

export class HospitalService extends BaseService<Hospital> {
  public getBaseUrl(): string {
    return `${this.actor}/hospitals`;
  }
}
