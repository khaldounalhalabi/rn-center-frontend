import VacationStatusEnum from "@/enums/VacationStatusEnum";
import { User } from "./User";

interface Vacation {
  id: number;
  user_id: number;
  user?: User;
  from: string;
  to: string;
  reason: string;
  cancellation_reason?: string;
  status: VacationStatusEnum;
}

export default Vacation;
