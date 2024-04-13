import { BaseService } from "@/services/BaseService";
import {Description} from "@/Models/Departments";

export class DepartmentsService extends BaseService<Description> {
    public getBaseUrl(): string {
        return `${this.actor}/available-departments`;
    }
}
