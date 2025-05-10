import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/http/Response";
import { DELETE } from "@/http/Http";
import { Medicine } from "@/models/Medicine";

export class MediaService extends BaseService<MediaService, Medicine>() {
  public async delete(imageId: number): Promise<ApiResponse<boolean>> {
    const res = await DELETE<boolean>(`${this.role}/media/${imageId}`);
    return await this.errorHandler(res);
  }
}
