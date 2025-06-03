import { GET } from "@/http/Http";
import MedicalRecord from "@/models/MedicalRecord";
import { BaseService } from "@/services/BaseService";

class MedicalRecordService extends BaseService<
  MedicalRecordService,
  MedicalRecord
>() {
  getBaseUrl(): string {
    return `${this.role}/medical-records`;
  }

  public async getByPatient(
    patientId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ) {
    const response = await GET<MedicalRecord[]>(
      `${this.role}/customers/${patientId}/medical-records`,
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
    return await this.errorHandler(response);
  }
}


export default MedicalRecordService;