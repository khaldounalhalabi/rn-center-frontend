import { Navigate } from "@/actions/Navigate";
import { ApiResponse } from "@/Http/Response";
import { AuthResponse, User } from "@/Models/User";
import { GET, POST, PUT } from "@/Http/Http";
import { BaseService } from "./BaseService";
import { Clinic } from "@/Models/Clinic";
import {
  deleteRole,
  deleteTokens,
  getOtp,
  getPhone,
  setOtp,
  setPhone,
  setRole,
  setToken,
} from "@/actions/HelperActions";

export class AuthService extends BaseService<AuthService, AuthResponse>() {
  public successStatus: boolean = false;

  getBaseUrl(): string {
    return `/${this.role}`;
  }

  public async login(phone: string, password: string) {
    const response = await POST<AuthResponse>(`${this.baseUrl}/login`, {
      phone: phone,
      password: password,
    }).then((res: ApiResponse<AuthResponse>) => {
      if (res.ok()) {
        setToken(res?.data?.token, res?.data?.refresh_token);
        setRole(res?.data?.user?.role);
        this.successStatus = true;
      }

      return res;
    });
    if (this.successStatus) {
      await Navigate(`/${this.role}`);
    }

    return response;
  }

  public async checkResetCode(code: string) {
    const response = await POST<null>(
      `${this.baseUrl}/check-reset-password-code`,
      {
        reset_password_code: code,
      },
    ).then((response) => {
      this.successStatus = response.ok();
      return response;
    });

    if (this.successStatus) {
      await setOtp(code);
      await Navigate(`/auth/${this.baseUrl}/set-new-password`);
    }

    return response;
  }

  public async resendVerificationCode() {
    const phone = await getPhone();
    if (!phone) {
      await Navigate(`/auth/${this.role}/reset-password`);
    }

    return await POST<null>(`${this.baseUrl}/resend-verification-code`, {
      phone: phone,
    }).then((response) => {
      if (response.ok()) {
        setPhone(phone);
      }
      return response;
    });
  }

  public async passwordResetRequest(phone: string) {
    const response = await POST<null>(
      `${this.baseUrl}/password-reset-request`,
      { phone: phone },
    ).then((response) => {
      this.successStatus = response.ok();
      setPhone(phone);
      return response;
    });

    if (this.successStatus) {
      await Navigate(`/auth/${this.role}/reset-password-code`);
    }

    return response;
  }

  public async resetPassword(password: string, passwordConfirmation: string) {
    const code = await getOtp();
    const response = await POST<boolean>(`${this.baseUrl}/reset-password`, {
      reset_password_code: code,
      password: password,
      password_confirmation: passwordConfirmation,
    }).then((response) => {
      this.successStatus = response.ok();
      return response;
    });

    if (this.successStatus) await Navigate(`/auth/${this.role}/login`);
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

  public async userDetails(): Promise<ApiResponse<User>> {
    const res = await GET<User>(`${this.role}/me`);
    return await this.errorHandler(res);
  }

  public async GetClinicDetails(): Promise<ApiResponse<Clinic>> {
    const res = await GET<Clinic>(`${this.role}/clinic`);
    return await this.errorHandler(res);
  }

  public async updateUserDetails(
    data: any,
  ): Promise<ApiResponse<AuthResponse>> {
    const res = await POST<AuthResponse>(`${this.role}/update-user-data`, data);
    return await this.errorHandler(res);
  }

  public async UpdateClinicDetails(data: any): Promise<ApiResponse<Clinic>> {
    const res = await PUT<Clinic>(`${this.role}/clinic/update`, data);
    return await this.errorHandler(res);
  }

  public async agreeOnContract() {
    return this.errorHandler(await GET<boolean>(`doctor/contract/agree`));
  }

  public logout = async () => {
    await deleteTokens();
    await deleteRole();
    await Navigate(`/auth/${this.role}/login`);
  };
}
