import { BaseService } from "@/services/BaseService";
import {Multi, Prescriptions} from "@/Models/Prescriptions";
import {ApiResponse} from "@/Http/Response";
import {AppointmentLogs} from "@/Models/Appointment";
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
}
