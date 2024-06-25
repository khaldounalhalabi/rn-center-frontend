import { BaseService } from "@/services/BaseService";
import {Staff} from "@/Models/Staff";
import {ApiResponse} from "@/Http/Response";
import {POST, PUT} from "@/Http/Http";

export class StaffService extends BaseService<Staff> {
    public getBaseUrl(): string {
        return `${this.actor}/clinic-employees`;
    }

    public async updateEmployeePermissions(
        staffId: number,
        data:any
    ): Promise<ApiResponse<any>> {
        const res = await PUT<any>(
            `${this.actor}/clinic-employees/${staffId}/update-permissions`,
            data
        );
        return await this.errorHandler(res);
    }
}