import AssetTypeEnum from "@/enums/AssetTypeEnum";
import { Media } from "./Media";
import { User } from "./User";
import UserAsset from "./UserAsset";

interface Asset {
  id: number;
  name: string;
  serial_number?: string;
  type: AssetTypeEnum;
  quantity: number;
  purchase_date?: string;
  assigned_quantity: number;
  total_quantity: number;
  image?: Media[];
  user_assets?: UserAsset[];
  assigned_users?: User[];
  quantity_unit?: string;
  can_checkin: boolean;
  can_checkout: boolean;
  asset_assigned_user?: User;
}

export default Asset;
