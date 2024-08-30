import { BaseService } from "@/services/BaseService";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import { GET } from "@/Http/Http";

export class ClinicSubscriptionService extends BaseService<ClinicSubscription> {
  public getBaseUrl(): string {
    return `${this.actor}/clinic-subscriptions`;
  }

  public async collectForThisMonth(clinicId: number) {
    return this.errorHandler(
      await GET<boolean>(
        `admin/clinics/${clinicId}/clinic-subscriptions/current/pay`,
      ),
    );
  }
}
