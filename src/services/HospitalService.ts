import { Hospital } from "@/Models/Hospital";
import { BaseService } from "@/services/BaseService";
import {ApiResponse} from "@/Http/Response";
import {GET, POST} from "@/Http/Http";

export class HospitalService extends BaseService<Hospital> {
  public getBaseUrl(): string {
    return `${this.actor}/hospitals`;
  }
  public async toggleStatus(
      hospitaltId: number,
  ): Promise<ApiResponse<any>> {
    const res = await GET<any>(
        `${this.actor}/hospitals/${hospitaltId}/toggle-status`,
    );
    return this.errorHandler(res)
  }
}