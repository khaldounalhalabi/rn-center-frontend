import { BaseService } from "@/services/BaseService";
import { JoinRequest } from "@/Models/JoinRequest";

export class JoinRequestService extends BaseService<JoinRequest> {
  getBaseUrl(): string {
    if (this.actor == "public") {
      return "/clinic-join-requests";
    }
    return `/${this.actor}/clinic-join-requests`;
  }
}
