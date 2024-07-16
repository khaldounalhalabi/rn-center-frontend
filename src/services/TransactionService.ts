import { BaseService } from "@/services/BaseService";
import { Transactions } from "@/Models/Transactions";
import {ApiResponse} from "@/Http/Response";
import {Summary} from "@/Models/ClinicTransaction";
import {GET} from "@/Http/Http";

export class TransactionService extends BaseService<Transactions> {
  public getBaseUrl(): string {
    return `${this.actor}/transactions`;
  }
  public async getSummary(
  ): Promise<ApiResponse<Summary>> {
    const res = await GET<Summary>(
        `${this.actor}/transactions/summary`
    );
    return await this.errorHandler(res);
  }
}