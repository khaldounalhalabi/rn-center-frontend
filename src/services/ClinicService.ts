import { BaseService } from "@/services/BaseService";
import { Clinic } from "@/Models/Clinic";

export class ClinicService extends BaseService<Clinic> {
  public getBaseUrl(): string {
    return `${this.actor}/clinics`;
  }
}
