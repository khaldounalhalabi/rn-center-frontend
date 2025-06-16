import { Speciality } from "@/models/Speciality";
import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/http/Response";
import { GET } from "@/http/Http";
import { RoleEnum } from "@/enums/RoleEnum";

export class SpecialityService extends BaseService<
  SpecialityService,
  Speciality
>() {
  public getBaseUrl(): string {
    if (this.role == RoleEnum.PUBLIC) {
      return `/specialities`;
    } else {
      return `${this.role}/specialities`;
    }
  }
}
