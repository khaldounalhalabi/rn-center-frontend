import { BaseService } from "@/services/BaseService";
import { User } from "@/Models/User";
import { DELETE } from "@/Http/Http";
import { ApiResponse } from "@/Http/Response";

export class UserService extends BaseService<User | string> {
  getBaseUrl(): string {
    return `${this.actor}/users`;
  }

  public toggleArchive = async (userId: number | undefined) => {
    if (!userId) throw new Error("Undefined User ID");
    const res: ApiResponse<string> = await DELETE(
      `${this.baseUrl}/${userId}/toggle-archive`,
      undefined,
      this.headers
    );
    return this.errorHandler(res);
  };
}