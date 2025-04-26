import { BaseService } from "@/services/BaseService";
import { User } from "@/Models/User";
import { ApiResponse } from "@/Http/Response";
import { DELETE, GET } from "@/Http/Http";

export class UsersService extends BaseService<UsersService, User>() {
  getBaseUrl(): string {
    return `${this.role}/users`;
  }

  public async toggleArchive(userId: number): Promise<ApiResponse<User>> {
    const res = await DELETE<User>(
      `${this.role}/users/${userId}/toggle-archive`,
      undefined,
      this.headers,
    );
    return await this.errorHandler(res);
  }

  public async toggleBlock(userId: number): Promise<ApiResponse<User>> {
    const res = await GET<User>(
      `${this.role}/users/${userId}/toggle-block`,
      undefined,
      this.headers,
    );
    return await this.errorHandler(res);
  }
}
