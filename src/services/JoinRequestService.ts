import { BaseService } from "@/services/BaseService";
import { JoinRequest } from "@/Models/JoinRequest";

export class JoinRequestService extends BaseService<JoinRequest> {
  public getBaseUrl(): string {
    if (this.role == "public") {
      return `/clinic-join-requests`;
    } else {
      return `/admin/clinic-join-requests`;
    }
  }
}
