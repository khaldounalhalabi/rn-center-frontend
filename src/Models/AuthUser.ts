import { User } from "@/Models/User";

export interface AuthUser {
  user: User;
  token: string | null;
  refresh_token: string | null;
}
