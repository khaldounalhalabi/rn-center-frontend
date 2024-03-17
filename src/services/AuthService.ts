import { navigate } from "@/Actions/navigate";
import { POST } from "@/Http/QueryFetch";
import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";
import { setServerCookie } from "@/Actions/serverCookies";

export class AuthService {
  public static instance?: AuthService | undefined | null;
  public successStatus: boolean = false;

  public static make() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    AuthService.instance.successStatus = false;
    return AuthService.instance;
  }

  public async login(url: string, dataForm: object, pageType: string) {
    const response = await POST(url, dataForm).then((res: ApiResult<User>) => {
      if (res.code == 200) {
        setServerCookie("token", res?.data?.token);
        setServerCookie("refresh_token", res?.data?.refresh_token);
        this.successStatus = true;
      }

      return res;
    });

    if (this.successStatus) await navigate(`/${pageType}`);

    return response;
  }

  public async submitResetCode(
    url: string,
    dataForm: object,
    pageType: string,
  ) {
    const response = await POST(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });

    if (this.successStatus)
      await navigate(`/auth/${pageType}/set-new-password`);

    return response;
  }

  public async requestResetPasswordRequest(
    url: string,
    dataForm: object,
    typePage: string,
  ) {
    const response = await POST(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });

    if (this.successStatus)
      await navigate(`/auth/${typePage}/reset-password-code`);

    return response;
  }

  public async setNewPassword(url: string, dataForm: object, pageType: string) {
    const response = await POST(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });
    if (this.successStatus) await navigate(`/auth/${pageType}/login`);
    return response;
  }

  public async requestVerificationCode(url: string, dataForm: object) {
    const response = await POST(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });

    if (this.successStatus) await navigate(`/customer`);

    return response;
  }
}
