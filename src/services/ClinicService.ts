import { BaseService } from "@/services/BaseService";
import { Clinic } from "@/Models/Clinic";

export class ClinicService extends BaseService<Clinic> {
  getBaseUrl(): string {
    return `${this.actor}/clinics`;
  }
}
