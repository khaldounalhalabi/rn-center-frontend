import { GET, POST } from "@/Http/QueryFetch";
import { ApiResult } from "@/Http/Response";

export class BaseService<T> {
  public baseUrl = "/";

  public static instance?: BaseService<any> | null | undefined = null;

  constructor() {}

  public static make() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

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

  public async store(data: any, headers?: object) {
    return await POST(this.baseUrl, data, headers);
  }
}
