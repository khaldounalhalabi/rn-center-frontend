import { BaseService } from "@/services/BaseService";
import { Setting } from "@/Models/setting";
import { GET, POST } from "@/Http/Http";

export class SettingService extends BaseService<SettingService, Setting>() {
  public getBaseUrl(): string {
    return `${this.role}/settings`;
  }

  public async getByLabel(label: string) {
    return this.errorHandler(
      await GET<Setting>(`settings/by-label/${label}`, undefined, this.headers),
    );
  }

  public async getByLabels(labels: string[]) {
    return this.errorHandler(
      await POST<Setting[]>(
        "settings/get-by-labels",
        { labels: labels },
        this.headers,
      ),
    );
  }
}
