import { BaseService } from "@/services/BaseService";
import {MedicineData, Prescription} from "@/Models/Prescriptions";
import {ApiResponse} from "@/Http/Response";
import {DELETE, GET} from "@/Http/Http";

export class PrescriptionService extends BaseService<Prescription> {
    public getBaseUrl(): string {
        return `${this.actor}/prescriptions`;
    }
    public async deleteMedicine(
        medicineId: number,
    ): Promise<ApiResponse<MedicineData[]>> {
        return await DELETE<MedicineData[]>(
            `${this.actor}/prescriptions/medicine-data/${medicineId}`,
        );
    }


    public async getAllPrescriptions(
        appointmentId: number,
        page: number = 0,
        search?: string,
        sortCol?: string,
        sortDir?: string,
        per_page?: number,
        params?: object,
    ): Promise<ApiResponse<Prescription[]>> {
        return await GET<Prescription[]>(
            `${this.actor}/appointments/${appointmentId}/prescriptions`,
            {
                page: page,
                search: search,
                sort_col: sortCol,
                sort_dir: sortDir,
                per_page: per_page,
                ...params,
            },
        );
    }
}
