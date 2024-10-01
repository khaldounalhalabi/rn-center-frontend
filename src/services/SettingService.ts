import { BaseService } from "@/services/BaseService";
import { Setting } from "@/Models/setting";
import { GET } from "@/Http/Http";

export class SettingService extends BaseService<Setting> {
  public getBaseUrl(): string {
    return `${this.actor}/settings`;
  }

  public async getByLabel(label: string) {
    return this.errorHandler(await GET<Setting>(`settings/by-label/${label}`));
  }
}
