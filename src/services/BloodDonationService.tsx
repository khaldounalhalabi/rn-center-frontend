import { BaseService } from "@/services/BaseService";
import { BloodDonation } from "@/Models/BloodDonation";
import { ApiResponse } from "@/Http/Response";

export class BloodDonationService extends BaseService<BloodDonation> {
  public getBaseUrl(): string {
    return `${this.actor}/blood-donation-requests`;
  }

  public async getAvailable(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<BloodDonation[]>> {
    this.setBaseUrl("/blood-donations");
    return await this.indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      per_page,
      params,
    );
  }
}
