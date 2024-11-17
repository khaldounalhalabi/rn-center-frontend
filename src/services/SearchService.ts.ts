
import { BaseService } from "@/services/BaseService";
import {Search} from "@/Models/Search";

export class SearchService extends BaseService<Search> {
    public getBaseUrl(): string {
        return `/search`;
    }

}