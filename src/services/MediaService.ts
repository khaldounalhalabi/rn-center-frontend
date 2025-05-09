import { BaseService } from "@/services/BaseService";
import { ApiResponse } from "@/Http/Response";
import { DELETE } from "@/Http/Http";
import { Medicine } from "@/Models/Medicine";

export class MediaService extends BaseService<MediaService, Medicine>() {
  public async delete(imageId: number): Promise<ApiResponse<boolean>> {
    const res = await DELETE<boolean>(`${this.role}/media/${imageId}`);
    return await this.errorHandler(res);
  }
}
