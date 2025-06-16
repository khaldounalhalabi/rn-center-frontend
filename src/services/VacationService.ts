import VacationStatusEnum from "@/enums/VacationStatusEnum";
import { GET, POST } from "@/http/Http";
import Vacation from "@/models/Vacation";
import { BaseService } from "./BaseService";

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
      `${this.baseUrl}/toggle-status`,
      {
        vacation_id: id,
        status: status,
        cancellation_reason: cancellationReason ?? null,
      },
    );

    return this.errorHandler(response);
  }

  public async byUser(
    userId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: Record<string, any>,
  ) {
    const response = await GET<Vacation[]>(
      `/${this.role}/users/${userId}/vacations`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
    );

    return this.errorHandler(response);
  }

  public async activeByUser(userId: number) {
    const response = await GET<Vacation[]>(
      `/${this.role}/users/${userId}/vacations/active`,
    );

    return this.errorHandler(response);
  }

  public async myActiveVacations() {
    const response = await GET<Vacation[]>(`/${this.role}/vacations/active`);

    return this.errorHandler(response);
  }
}

export default VacationService;
