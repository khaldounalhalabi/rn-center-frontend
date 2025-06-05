import { GET, POST } from "@/http/Http";
import AttendanceLog from "@/models/AttendanceLog";
import UserAttendance from "@/models/UserAttendance";
import { BaseService } from "@/services/BaseService";

class AttendanceLogService extends BaseService<
  AttendanceLogService,
  AttendanceLog
>() {
  getBaseUrl(): string {
    return `${this.role}/attendances`;
  }

  public editOrCreateUserAttendance = async (userId: number, data: any) => {
    const response = await POST<AttendanceLog[]>(
      `/admin/users/${userId}/attendances`,
      data,
      this.headers,
    );

    return this.errorHandler(response);
  };

  public async mine(year: string, month: number) {
    const response = await GET<UserAttendance>(
      `/${this.role}/attendances`,
      {
        year: year,
        month: month,
      },
      this.headers,
    );

    return this.errorHandler(response);
  }
}

export default AttendanceLogService;
