import { BaseService } from "@/services/BaseService";


export class SpecialityService extends BaseService<any> {
    public getBaseUrl(): string {
        return `${this.actor}/specialities`;
    }
}
