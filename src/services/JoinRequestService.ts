import { BaseService } from "@/services/BaseService";
import { JoinRequest } from "@/Models/JoinRequest";
import {RoleEnum} from "@/enum/RoleEnum";

export class JoinRequestService extends BaseService<
  JoinRequestService,
  JoinRequest
>() {
  public getBaseUrl(): string {
    if (this.role == RoleEnum.PUBLIC) {
      return `/clinic-join-requests`;
    } else {
      return `/admin/clinic-join-requests`;
    }
  }
}
