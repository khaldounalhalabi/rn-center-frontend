import { GET } from "@/http/Http";
import UserAsset from "@/models/UserAsset";
import { BaseService } from "./BaseService";

export default class UserAssetService extends BaseService<
  UserAssetService,
  UserAsset
>() {
  public getBaseUrl(): string {
    return `/${this.role}/users-assets`;
  }

  /**
   * @param userId
   * @param page
   * @param search
   * @param sortCol
   * @param sortDir
   * @param per_page
   * @param params
   * @returns
   */
  public async getAssignedByUser(
    userId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: Record<string, any>,
  ) {
    const response = await GET<UserAsset>(
      `/${this.role}/users/${userId}/user-assets`,
      {
        page: page,
        search: search,
        sort_dir: sortDir,
        sort_col: sortCol,
        per_page: per_page,
        ...params,
      },
    );
    return this.errorHandler(response);
  }

  /**
   * @param assetId
   * @param page
   * @param search
   * @param sortCol
   * @param sortDir
   * @param per_page
   * @param params
   * @returns
   */
  public async getAssignedByAsset(
    assetId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: Record<string, any>,
  ) {
    const response = await GET<UserAsset>(
      `/${this.role}/assets/${assetId}/user-assets`,
      {
        page: page,
        search: search,
        sort_dir: sortDir,
        sort_col: sortCol,
        per_page: per_page,
        ...params,
      },
    );
    return this.errorHandler(response);
  }

  public async assignedToMe(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: Record<string, any>,
  ) {
    const response = await GET<UserAsset[]>(`/${this.role}/user-assets/mine`, {
      page: page,
      search: search,
      sort_dir: sortDir,
      sort_col: sortCol,
      per_page: per_page,
      ...params,
    });

    return this.errorHandler(response);
  }
}
