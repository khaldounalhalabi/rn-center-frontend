import { POST } from "@/http/Http";
import Vacation from "@/models/Vacation";
import { BaseService } from "./BaseService";
import VacationStatusEnum from "@/enums/VacationStatusEnum";

class VacationService extends BaseService<VacationService, Vacation>() {
  public getBaseUrl(): string {
    return `${this.role}/vacations`;
  }

  public async toggleStatus(
    id: number,
    status: VacationStatusEnum,
    cancellationReason: string | undefined = undefined,
  ) {
    const response = await POST<VacationStatusEnum | undefined>(
      `${(this, this.baseUrl)}/toggle-status`,
      {
        vacation_id: id,
        status: status,
        cancellation_reason: cancellationReason ?? null,
      },
    );

    return this.errorHandler(response);
  }
}

export default VacationService;
