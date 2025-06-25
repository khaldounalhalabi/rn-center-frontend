import { POST } from "@/http/Http";
import Asset from "@/models/Asset";
import { BaseService } from "./BaseService";

export default class AssetService extends BaseService<AssetService, Asset>() {
  public getBaseUrl(): string {
    return `/${this.role}/assets`;
  }

  public async checkin(data: {
    asset_id: number;
    user_id: number;
    quantity?: number;
    checkin_condition?: number;
    expected_return_data?: string;
  }) {
    const response = await POST<Asset>(
      `${this.baseUrl}/checkin`,
      data,
      this.headers,
    );

    return this.errorHandler(response);
  }

  public async checkout(data: {
    asset_id: number;
    user_id: number;
    quantity?: number;
    checkout_condition?: number;
  }) {
    const response = await POST<Asset>(
      `${this.baseUrl}/checkout`,
      data,
      this.headers,
    );
    return this.errorHandler(response);
  }
}
