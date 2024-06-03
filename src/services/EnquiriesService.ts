import { BaseService } from "@/services/BaseService";
import { Enquiries } from "@/Models/Enquiries";
import { ApiResponse } from "@/Http/Response";
import { POST } from "@/Http/Http";

export class EnquiriesService extends BaseService<Enquiries> {
  public getBaseUrl(): string {
    return `${this.actor}/enquiries`;
  }

  //TODO::check on this
  public async reply(
    enquiriesId: number,
    data: { title: string; body: string },
  ): Promise<ApiResponse<{ title: string; body: string }>> {
    const res = await POST<{ title: string; body: string }>(
      `${this.actor}/enquiries/${enquiriesId}/reply`,
      data,
    );
    return await this.errorHandler(res)

  }
}