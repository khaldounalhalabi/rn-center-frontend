import { BaseService } from "@/services/BaseService";
import { Subscriptions } from "@/Models/Subscriptions";

export class SubscriptionsService extends BaseService<Subscriptions> {
  public getBaseUrl(): string {
    return `${this.actor}/subscriptions`;
  }
}
