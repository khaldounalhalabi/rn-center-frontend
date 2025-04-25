import { BaseService } from "@/services/BaseService";
import { Enquiries } from "@/Models/Enquiries";
import { ApiResponse } from "@/Http/Response";
import { POST } from "@/Http/Http";

export class EnquiriesService extends BaseService<
  EnquiriesService,
  Enquiries
>() {
  public getBaseUrl(): string {
    return `${this.role}/enquiries`;
  }

  public async reply(
    enquiriesId: number,
    data: { title: string; body: string },
  ): Promise<ApiResponse<boolean>> {
    const res = await POST<boolean>(
      `${this.role}/enquiries/${enquiriesId}/reply`,
      data,
      this.headers,
    );
    return await this.errorHandler(res);
  }

  async store(data: any, headers?: object): Promise<ApiResponse<Enquiries>> {
    const res: ApiResponse<Enquiries> = await POST<Enquiries>(
      `enquiry/send`,
      data,
      {
        ...headers,
        ...this.headers,
      },
    );
    return await this.errorHandler(res);
  }
}
