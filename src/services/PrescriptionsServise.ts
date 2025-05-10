import { BaseService } from "@/services/BaseService";
import { Prescription } from "@/models/Prescriptions";
import { ApiResponse } from "@/http/Response";
import { GET } from "@/http/Http";

export class PrescriptionService extends BaseService<
  PrescriptionService,
  Prescription
>() {
  public getBaseUrl(): string {
    return `${this.role}/prescriptions`;
  }

  public async getAllPatientPrescriptions(
    patientId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Prescription[]>> {
    const res = await GET<Prescription[]>(
      `${this.role}/customers/${patientId}/prescriptions`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      this.headers,
    );
    return await this.errorHandler(res);
  }
}
