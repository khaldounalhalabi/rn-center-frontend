import { BaseService } from "@/services/BaseService";
import { Clinic } from "@/Models/Clinic";
import {ApiResponse} from "@/Http/Response";
import {Appointment} from "@/Models/Appointment";
import {GET} from "@/Http/Http";

export class ClinicService extends BaseService<Clinic> {
  getBaseUrl(): string {
    return `${this.actor}/clinics`;
  }
  public async getClinicsBySubscription(
      subscriptionId: number,
      page: number = 0,
      search?: string,
      sortCol?: string,
      sortDir?: string,
      per_page?: number,
      params?: object,
  ): Promise<ApiResponse<Clinic[]>> {
    const res = await GET<Clinic[]>(
        `${this.actor}/subscriptions/${subscriptionId}/clinics`,
        {
          page: page,
          search: search,
          sort_col: sortCol,
          sort_dir: sortDir,
          per_page: per_page,
          ...params,
        },
    );
    return await this.errorHandler(res);
  }
}