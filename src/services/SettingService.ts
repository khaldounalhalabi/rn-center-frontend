import { BaseService } from "@/services/BaseService";
import { Setting } from "@/Models/setting";

export class SettingService extends BaseService<Setting> {
  public getBaseUrl(): string {
    return `${this.actor}/settings`;
  }
}
