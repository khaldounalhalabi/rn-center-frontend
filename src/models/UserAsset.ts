import UserAssetStatusEnum from "@/enums/UserAssetStatusEnum";
import { User } from "./User";

interface UserAsset {
  id: number;
  asset_id: number;
  user_id: number;
  status: UserAssetStatusEnum;
  checkin_condition?: number;
  checkout_condition?: number;
  checkin_date: string;
  checkout_date?: string;
  expected_return_date?: string;
  quantity: number;
  user?: User;
}

export default UserAsset;
