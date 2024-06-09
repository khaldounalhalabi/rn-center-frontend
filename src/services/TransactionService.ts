import { BaseService } from "@/services/BaseService";
import {Transactions} from "@/Models/Transactions";

export class TransactionService extends BaseService<Transactions> {
    public getBaseUrl(): string {
        return `${this.actor}/transactions`;
    }
}