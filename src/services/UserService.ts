import { BaseService } from "@/services/BaseService";
import { User } from "@/Models/User";
import { AuthService } from "@/services/AuthService";
import { DELETE } from "@/Http/Http";
import { ApiResponse } from "@/Http/Response";

export class UserService extends BaseService<User | string> {
  public static make() {
    if (!this.instance) {
      this.instance = new this();
    }
    AuthService.getCurrentActor().then((actor) => {
      this.instance.actor = actor;
    });

    this.instance.setBaseUrl(`${this.instance.actor}/users`);

    return this.instance;
  }

  public toggleArchive = async (userId: number | undefined) => {
    if (!userId) throw new Error("Undefined User ID");
    const res: ApiResponse<string> = await DELETE(
      `${this.baseUrl}/${userId}/toggle-archive`
    );
    return this.errorHandler(res);
  };
}
