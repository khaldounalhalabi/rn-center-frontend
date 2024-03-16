import { GET } from "@/Http/QueryFetch";
import { ApiResult } from "@/Http/Response";

export abstract class BaseService<T> {
  public baseUrl = "/";

  public async indexWithPagination(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    params?: object,
  ): Promise<ApiResult<T>> {
    return await GET(this.baseUrl, {
      page: page,
      search: search,
      sort_col: sortCol,
      sort_dir: sortDir,
      ...params,
    });
  }
}
