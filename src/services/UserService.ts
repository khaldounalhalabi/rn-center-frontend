import { BaseService } from "@/services/BaseService";
import { User } from "@/models/User";
import { GET, POST } from "@/http/Http";
import { UsersWithAttendance } from "@/models/Attendance";
import { ApiResponse } from "@/http/Response";

export class UserService extends BaseService<UserService, User>() {
  getBaseUrl(): string {
    return `${this.role}/users`;
  }

  public indexWithAttendance = async (
    date: string,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    perPage?: number,
    params?: Record<string, any>,
  ) => {
    const response = await GET<UsersWithAttendance>(
      `${this.role}/users/attendances`,
      {
        attendance_at: date,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: perPage,
        page: params?.page || 1,
        ...params,
      },
    );

    return this.errorHandler(response);
  };

  public getSecretaries = async (
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: Record<string, any>,
  ) => {
    const response = await GET<User[]>(
      `${this.role}/users/secretaries`,
      {
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        page: page || 1,
        ...params,
      },
      this.headers,
    );

    return this.errorHandler(response);
  };

  public storeSecretary = async (
    data: Record<string, any> | undefined,
    headers: Record<string, any> = {},
  ) => {
    const response: ApiResponse<User> = await POST<User>(
      `/admin/users/secretaries`,
      data,
      {
        ...headers,
        ...this.headers,
      },
    );
    return await this.errorHandler(response);
  };
}
