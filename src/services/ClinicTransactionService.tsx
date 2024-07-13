import { BaseService } from "@/services/BaseService";
import {ClinicTransaction, Summary} from "@/Models/ClinicTransaction";
import {ApiResponse} from "@/Http/Response";
import {GET} from "@/Http/Http";

export class ClinicTransactionService extends BaseService<ClinicTransaction> {
    public getBaseUrl(): string {
        return `doctor/clinic-transactions`;
    }

    public async getSummary(
    ): Promise<ApiResponse<Summary>> {
        const res = await GET<Summary>(
            `doctor/clinic-transactions/summary`
        );
        return await this.errorHandler(res);
    }

    public async getAll(
        sortCol?: string,
        sortDir?: string,
        params?: object
    ): Promise<ApiResponse<ClinicTransaction[]>> {
        const res = await GET<ClinicTransaction[]>(
            `doctor/clinic-transactions/all`,
            {
                sort_col: sortCol,
                sort_dir: sortDir,
                ...params,
            },
            this.headers
        );
        return await this.errorHandler(res);
    }
}