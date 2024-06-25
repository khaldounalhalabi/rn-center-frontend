import { BaseService } from "@/services/BaseService";
import {ApiResponse} from "@/Http/Response";
import {DELETE} from "@/Http/Http";

export class DeleteMediaService extends BaseService<any> {
    public async DeleteImage(
        imageId: number,
    ): Promise<ApiResponse<boolean>> {
        const res = await DELETE<boolean>(
            `media/${imageId}`,
        );
        return await this.errorHandler(res);
    }
}