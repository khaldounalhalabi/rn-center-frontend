import { BaseService } from "@/services/BaseService";
import { User } from "@/Models/User";
import { ApiResponse } from "@/Http/Response";
import { DELETE, GET } from "@/Http/Http";

export class UsersService extends BaseService<User> {
  getBaseUrl(): string {
    return `${this.actor}/users`;
  }
  public async toggleArchive(userId: number): Promise<ApiResponse<User>> {
    return await DELETE<User>(`${this.actor}/users/${userId}/toggle-archive`);
  }
  public async toggleBlock(userId: number): Promise<ApiResponse<User>> {
    return await GET<User>(`${this.actor}/users/${userId}/toggle-block`);
  }
}
