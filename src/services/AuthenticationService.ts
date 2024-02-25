import { Http } from "@/Http/Http";
import { ApiResult } from "@/Http/Response";
import { BaseService } from "@/services/Contracts/BaseService";
import { AuthUser } from "@/Models/AuthUser";

export class AuthenticationService extends BaseService<AuthUser> {
  public static instance: AuthenticationService | null;

  public static make(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  public async login(
    email: string,
    password: string,
  ): Promise<ApiResult<AuthUser>> {
    return Http.make().post({ email, password }, "admin/login");
  }
}
