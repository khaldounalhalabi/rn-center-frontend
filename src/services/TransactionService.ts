import { GET } from "@/http/Http";
import { ApiResponse } from "@/http/Response";
import Balance from "@/models/Balance";
import { Transaction } from "@/models/Transaction";
import { BaseService } from "@/services/BaseService";

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

  public async balanceTrend(): Promise<
    ApiResponse<{ balance: number; created_at: string }[]>
  > {
    const response = await GET<{ balance: number; created_at: string }[]>(
      `/${this.role}/balance/trend`,
    );
    return await this.errorHandler(response);
  }

  public async chart(): Promise<
    ApiResponse<{
      income: { date: string; amount: number }[];
      outcome: { date: string; amount: number }[];
    }>
  > {
    const response = await GET<{
      income: { date: string; amount: number }[];
      outcome: { date: string; amount: number }[];
    }>(`/${this.role}/transactions/chart`);

    return await this.errorHandler(response);
  }
}
