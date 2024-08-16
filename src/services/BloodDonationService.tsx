import { BaseService } from "@/services/BaseService";
import {BloodBank, BloodDonation} from "@/Models/BloodDonation";
import {ApiResponse} from "@/Http/Response";
import {GET} from "@/Http/Http";

export class BloodDonationService extends BaseService<BloodDonation> {
  public getBaseUrl(): string {
    return `${this.actor}/blood-donation-requests`;
  }

  public async getBloodBank(): Promise<ApiResponse<BloodBank[]>> {
    const res = await GET<BloodBank[]>(`/blood-donations`);
    return await this.errorHandler(res);
  }
}