import { BaseService } from "@/services/BaseService";
import {Multi, Prescriptions} from "@/Models/Prescriptions";
import {ApiResponse} from "@/Http/Response";
import {Appointment, AppointmentLogs} from "@/Models/Appointment";
import {DELETE, GET} from "@/Http/Http";

export class PrescriptionsService extends BaseService<Prescriptions> {
    public getBaseUrl(): string {
        return `${this.actor}/prescriptions`;
    }
    public async deleteMedicine(
        medicineId: number,
    ): Promise<ApiResponse<Multi[]>> {
        return await DELETE<Multi[]>(
            `${this.actor}/prescriptions/medicine-data/${medicineId}`,
        );
    }


    public async getAllPrescriptions(
        appointmentsId: number,
        page: number = 0,
        search?: string,
        sortCol?: string,
        sortDir?: string,
        per_page?: number,
        params?: object,
    ): Promise<ApiResponse<Prescriptions[]>> {
        return await GET<Prescriptions[]>(
            `${this.actor}/appointments/${appointmentsId}/prescriptions`,
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
