import AttendanceLogTypeEnum from "@/enum/AttendanceLogTypeEnum";
import AttendanceLogStatusEnum from "@/enum/AttendanceLogStatusEnum";
import { User } from "@/models/User";

interface AttendanceLog {
  id: number;
  attendance_id: number;
  user_id: number;
  attend_at: string;
  type: AttendanceLogTypeEnum;
  status: AttendanceLogStatusEnum;
  user?: User;
}

export default AttendanceLog;
