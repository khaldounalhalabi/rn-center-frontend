import { BaseService } from "@/services/BaseService";
import AttendanceLog from "@/models/AttendanceLog";
import { POST } from "@/http/Http";

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
}

export default AttendanceLogService;
