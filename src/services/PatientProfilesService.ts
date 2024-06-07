import { BaseService } from "@/services/BaseService";
import {PatientProfiles} from "@/Models/PatientProfiles";
import {ApiResponse} from "@/Http/Response";
import {Appointment} from "@/Models/Appointment";
import {GET} from "@/Http/Http";

export class PatientProfilesService extends BaseService<PatientProfiles> {
    public getBaseUrl(): string {
        return `${this.actor}/patient-profiles`;
    }
    public async getCustomerPatientProfiles(
    patientId: number,
        page: number = 0,
        search?: string,
        sortCol?: string,
        sortDir?: string,
        per_page?: number,
        params?: object,
    ): Promise<ApiResponse<PatientProfiles[]>> {
        const res = await GET<PatientProfiles[]>(
            `${this.actor}/customers/${patientId}/patient-profiles`,
            {
                page: page,
                search: search,
                sort_col: sortCol,
                sort_dir: sortDir,
                per_page: per_page,
                ...params,
            },
        );
        return await this.errorHandler(res);
    }
}