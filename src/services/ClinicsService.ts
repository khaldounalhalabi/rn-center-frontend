import { BaseService } from "@/services/BaseService";
import { Clinic } from "@/models/Clinic";
import { ApiResponse } from "@/http/Response";
import { GET } from "@/http/Http";
import { RoleEnum } from "@/enums/RoleEnum";

export class ClinicsService extends BaseService<ClinicsService, Clinic>() {
  getBaseUrl(): string {
    if (this.role == RoleEnum.PUBLIC) {
      return `/clinics`;
    }
    return `${this.role}/clinics`;
  }
}
