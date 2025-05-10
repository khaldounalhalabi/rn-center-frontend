import { BaseService } from "@/services/BaseService";
import { Transaction } from "@/Models/Transaction";
import { ApiResponse } from "@/http/Response";
import { GET } from "@/http/Http";
import Balance from "@/Models/Balance";

export class TransactionService extends BaseService<
  TransactionService,
  Transaction
>() {
  public getBaseUrl(): string {
    return `${this.role}/transactions`;
  }

  public async balance(): Promise<ApiResponse<Balance>> {
    const res = await GET<Balance>(`${this.role}/transactions/balance`);
    return await this.errorHandler(res);
  }
}
