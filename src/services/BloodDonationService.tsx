


import { BaseService } from "@/services/BaseService";

export class BloodDonationService extends BaseService<BloodDonation> {
    public getBaseUrl(): string {
        return `${this.actor}/blood-donation-requests`;
    }
}