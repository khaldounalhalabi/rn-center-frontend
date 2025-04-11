import { BaseService } from "@/services/BaseService";
import { MedicineData, Prescription } from "@/Models/Prescriptions";
import { ApiResponse } from "@/Http/Response";
import { DELETE, GET } from "@/Http/Http";

export class PrescriptionService extends BaseService<Prescription> {
  public getBaseUrl(): string {
    return `${this.role}/prescriptions`;
  }

  public async deleteMedicine(
    medicineId: number,
  ): Promise<ApiResponse<MedicineData[]>> {
    const res = await DELETE<MedicineData[]>(
      `${this.role}/prescriptions/medicine-data/${medicineId}`,
      undefined,
      this.headers,
    );
    return await this.errorHandler(res);
  }

  public async getAllAppointmentPrescriptions(
    appointmentId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Prescription[]>> {
    const res = await GET<Prescription[]>(
      `${this.role}/appointments/${appointmentId}/prescriptions`,
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
