import { BaseService } from "@/services/BaseService";
import { Staff } from "@/Models/Staff";
import { ApiResponse } from "@/Http/Response";
import { PUT } from "@/Http/Http";

export class StaffService extends BaseService<StaffService, Staff>() {
  public getBaseUrl(): string {
    return `${this.role}/clinic-employees`;
  }

  public async updateEmployeePermissions(
    staffId: number,
    data: any,
  ): Promise<ApiResponse<any>> {
    const res = await PUT<any>(
      `${this.role}/clinic-employees/${staffId}/update-permissions`,
      data,
    );
    return await this.errorHandler(res);
  }
}
