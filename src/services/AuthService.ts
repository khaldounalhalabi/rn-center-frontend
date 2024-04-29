import { Navigate } from "@/Actions/navigate";
import { ApiResponse } from "@/Http/Response";
import { AuthResponse } from "@/Models/User";
import { setServerCookie } from "@/Actions/serverCookies";
import { GET, POST } from "@/Http/Http";

export class AuthService {
  public static instance?: AuthService | undefined | null;
  public successStatus: boolean = false;
  private locale: string = "en";

  public static make() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    AuthService.instance.successStatus = false;

    return AuthService.instance;
  }

  public static async getCurrentActor() {
    const res = await GET<string>("/check-role");
    return res.data;
  }

  public async login(url: string, dataForm: object, pageType: string) {
    const response = await POST<AuthResponse>(url, dataForm).then(
      (res: ApiResponse<AuthResponse>) => {
        if (res.code == 200) {
          setServerCookie("token", res?.data?.token ?? "");
          setServerCookie("refresh_token", res?.data?.refresh_token ?? "");
          this.successStatus = true;
        }

        return res;
      },
    );
    if (this.successStatus) await Navigate(`/${pageType}`);

    const userType = await AuthService.getCurrentActor();
    await setServerCookie("user-type", userType);

    return response;
  }

  public async submitResetCode(
    url: string,
    dataForm: object,
    pageType: string,
  ) {
    const response = await POST<null>(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });

    if (this.successStatus)
      await Navigate(`/auth/${pageType}/set-new-password`);

    return response;
  }

  public async requestResetPasswordRequest(
    url: string,
    dataForm: object,
    typePage: string,
  ) {
    const response = await POST<null>(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });

    if (this.successStatus)
      await Navigate(`/auth/${typePage}/reset-password-code`);

    return response;
  }

  public async setNewPassword(url: string, dataForm: object, pageType: string) {
    const response = await POST<boolean>(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });

    if (this.successStatus) await Navigate(`/auth/${pageType}/login`);
    return response;
  }

  public async requestVerificationCode(url: string, dataForm: object) {
    const response = await POST<boolean>(url, dataForm).then((e) => {
      this.successStatus = e.code == 200;
      return e;
    });

    if (this.successStatus) await Navigate(`/customer`);

    return response;
  }
}
