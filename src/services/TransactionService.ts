import { BaseService } from "@/services/BaseService";
import { AdminSummary, Transactions } from "@/Models/Transactions";
import { ApiResponse } from "@/Http/Response";
import { ClinicSummary } from "@/Models/ClinicTransaction";
import { GET } from "@/Http/Http";

export class TransactionService extends BaseService<Transactions> {
  public getBaseUrl(): string {
    return `${this.actor}/transactions`;
  }
  public async getSummary(): Promise<ApiResponse<AdminSummary>> {
    const res = await GET<AdminSummary>(`${this.actor}/transactions/summary`);
    return await this.errorHandler(res);
  }
}
