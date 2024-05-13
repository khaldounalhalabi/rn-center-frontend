import { BaseService } from "@/services/BaseService";
import {User} from "@/Models/User";

export class UsersService extends BaseService<User> {
    getBaseUrl(): string {
        return `${this.actor}/users`;
    }
}
