import { Navigate } from "@/Actions/navigate";
import { ApiResponse } from "@/Http/Response";
import { AuthResponse, User } from "@/Models/User";
import { setServerCookie } from "@/Actions/serverCookies";
import { GET, POST, PUT } from "@/Http/Http";
import { BaseService } from "./BaseService";
import { Clinic } from "@/Models/Clinic";

export class AuthService extends BaseService<AuthResponse> {
  public successStatus: boolean = false;
  private locale: string = "en";

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

  public async GetUserDetails(): Promise<ApiResponse<User>> {
    const res = await GET<User>(`${this.actor}/me`);
    return await this.errorHandler(res);
  }

  public async GetClinicDetails(): Promise<ApiResponse<Clinic>> {
    const res = await GET<Clinic>(`${this.actor}/clinic`);
    return await this.errorHandler(res);
  }

  public async UpdateUserDetails(data: any): Promise<ApiResponse<User>> {
    const res = await POST<User>(`${this.actor}/update-user-data`, data);
    return await this.errorHandler(res);
  }

  public async UpdateClinicDetails(data: any): Promise<ApiResponse<Clinic>> {
    const res = await PUT<Clinic>(`${this.actor}/clinic/update`, data);
    return await this.errorHandler(res);
  }
}