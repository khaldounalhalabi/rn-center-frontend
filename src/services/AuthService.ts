import {
  deleteRole,
  deleteTokens,
  deleteUser,
  getOtp,
  getPhone,
  setOtp,
  setPhone,
  setRole,
  setToken,
  setUser,
} from "@/actions/HelperActions";
import { Navigate } from "@/actions/Navigate";
import { GET, POST } from "@/http/Http";
import { ApiResponse } from "@/http/Response";
import { AuthResponse, User } from "@/models/User";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService<AuthService, AuthResponse>() {
  public successStatus: boolean = false;

  getBaseUrl(): string {
    return `/${this.role}`;
  }

  public async login(phone: string, password: string) {
    const response = await POST<AuthResponse>(`${this.baseUrl}/login`, {
      phone: phone,
      password: password,
    });

    if (response.ok()) {
      await setToken(response?.data?.token, response?.data?.refresh_token);
      await setRole(response?.data?.user?.role);
      await setUser(response?.data?.user);
      this.successStatus = true;
    }

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
  public async userDetails(): Promise<ApiResponse<User>> {
    const res = await GET<User>(`${this.role}/me`);
    return await this.errorHandler(res);
  }
  public async updateUserDetails(
    data: any,
  ): Promise<ApiResponse<AuthResponse>> {
    const res = await POST<AuthResponse>(`${this.role}/update-user-data`, data);
    return await this.errorHandler(res);
  }
  public logout = async () => {
    await deleteTokens();
    await deleteRole();
    await deleteUser();
    await Navigate(`/auth/${this.role}/login`);
  };
}
