import { User } from "@/models/User";

interface Attendance {
  id: number;
  date: string;
  status: string;
}

export default Attendance;

export interface UsersWithAttendance {
  attendance: Attendance;
  users?: User[];
}
