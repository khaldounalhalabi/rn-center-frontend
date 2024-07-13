import { BaseService } from "@/services/BaseService";
import { Enquiries } from "@/Models/Enquiries";
import { ApiResponse } from "@/Http/Response";
import { POST } from "@/Http/Http";

export class EnquiriesService extends BaseService<Enquiries> {
  public getBaseUrl(): string {
    return `${this.actor}/enquiries`;
  }

  public async reply(
    enquiriesId: number,
    data: { title: string; body: string }
  ): Promise<ApiResponse<boolean>> {
    const res = await POST<boolean>(
      `${this.actor}/enquiries/${enquiriesId}/reply`,
      data,
      this.headers
    );
    return await this.errorHandler(res);
  }
}