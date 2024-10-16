import { BaseService } from "@/services/BaseService";
import { JoinRequest } from "@/Models/JoinRequest";

export class JoinRequestService extends BaseService<JoinRequest> {
  getBaseUrl(): string {
    return "/admin/clinic-join-requests";
  }
}
