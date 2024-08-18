import { AuthResponse, User } from "@/Models/User";
import { BaseService } from "./BaseService";
import { GET, POST } from "@/Http/Http";
import {
  deleteCookieServer,
  getCookieServer,
  setServerCookie,
} from "@/Actions/serverCookies";
import { Navigate } from "@/Actions/navigate";

export class CustomerAuthService extends BaseService<AuthResponse> {
  public getBaseUrl(): string {
    return "/customer";
  }

  /**
   * requestResetPasswordCode
   */
  public async requestResetPasswordCode(data: { phone_number: string }) {
    const response = await POST<null>(
      "/customer/password-reset-request",
      data,
      this.headers
    );

    return this.errorHandler(response);
  }

  public async verifyCode(data: { verification_code: string }) {
    const response = await POST<boolean>(
      "/customer/verify-phone",
      data,
      this.headers
    );

    return this.errorHandler(response);
  }

  public async resetPassword(data: {
    password: string;
    password_confirmation: string;
  }) {
    const verificationCode =
      (await getCookieServer("customer_reset_password_code")) ?? undefined;
    if (!verificationCode) {
      await Navigate("/500");
    }

    const response = await POST<boolean>(
      "/customer/reset-password",
      {
        verification_code: verificationCode,
        ...data,
      },
      this.headers
    );

    deleteCookieServer("customer_reset_password_code");

    return this.errorHandler(response);
  }

  public async validateResetPasswordCode(data: { verification_code: string }) {
    const response = await POST<boolean>(
      "/customer/validate-reset-code",
      data,
      this.headers
    );

    if (response.code == 200) {
      setServerCookie("customer_reset_password_code", data.verification_code);
    }

    return this.errorHandler(response);
  }

  public async requestVerificationCode(data: { phone_number: string }) {
    const response = await POST<boolean>(
      "customer/request-verification-code",
      data,
      this.headers
    );

    return this.errorHandler(response);
  }

  public async userDetails() {
    return this.errorHandler(await GET<User>(`/customer/me`, this.headers));
  }

  public async updateUserDetails(data: any) {
    return this.errorHandler(
      await POST<User>("/customer/update-user-data", data, this.headers)
    );
  }
}
