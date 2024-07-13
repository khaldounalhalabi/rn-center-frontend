import { BaseService } from "@/services/BaseService";
import {ClinicSubscription} from "@/Models/ClinicSubscription";

export class ClinicSubscriptionService extends BaseService<ClinicSubscription> {
    public getBaseUrl(): string {
        return `${this.actor}/clinic-subscriptions`;
    }
}