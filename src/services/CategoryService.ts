import { BaseService } from "@/services/BaseService";
import {Category} from "@/Models/Category";

export class CategoryService extends BaseService<Category> {
    public getBaseUrl(): string {
        return `${this.actor}/service-categories`;
    }
}
