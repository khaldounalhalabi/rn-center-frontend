import { BaseService } from "@/services/BaseService";
import { AdminSummary, Transactions } from "@/Models/Transactions";
import { ApiResponse } from "@/Http/Response";
import { GET } from "@/Http/Http";

export class TransactionService extends BaseService<
  TransactionService,
  Transactions
>() {
  public getBaseUrl(): string {
    return `${this.role}/transactions`;
  }

  public async getSummary(): Promise<ApiResponse<AdminSummary>> {
    const res = await GET<AdminSummary>(`${this.role}/transactions/summary`);
    return await this.errorHandler(res);
  }
}
