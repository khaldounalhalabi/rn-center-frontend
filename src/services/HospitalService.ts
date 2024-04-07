import { BaseService } from "@/services/BaseService";

export class HospitalService extends BaseService<any> {
    public getBaseUrl(): string {
        return `${this.actor}/hospitals`;
    }
}
