import { GET } from "@/http/Http";
import { ApiResponse } from "@/http/Response";
import { BaseService } from "./BaseService";

export class NotificationService extends BaseService<
  NotificationService,
  Notification
>() {
  public getBaseUrl(): string {
    return `${this.role}/notifications`;
  }

  public async indexWithPagination(
    page?: number,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<Notification[]>> {
    let response = await GET<Notification[]>(
      this.baseUrl,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      this.headers,
    );

    return this.errorHandler(response);
  }

  public async markAsRead(notificationId: string | number) {
    const response = await GET<boolean>(
      `${this.baseUrl}/${notificationId}/mark-as-read`,
    );

    return this.errorHandler(response);
  }

  public async getUnreadCount() {
    return this.errorHandler(await GET<number>(`${this.baseUrl}/unread/count`));
  }

  public async markAllAsRead() {
    return this.errorHandler(
      await GET<boolean>(`${this.baseUrl}/mark-all-as-read`),
    );
  }
}
