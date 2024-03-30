import { DELETE, GET, POST } from "@/Http/QueryFetch";
import { ApiResponse } from "@/Http/Response";
import { navigate } from "@/Actions/navigate";

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
  ): Promise<ApiResponse<T>> {
    const res = await GET(this.baseUrl, {
      page: page,
      search: search,
      sort_col: sortCol,
      sort_dir: sortDir,
      ...params,
    });

    return await this.errorHandler(res);
  }

  public async store(data: any, headers?: object): Promise<ApiResponse<T>> {
    const res = await POST(this.baseUrl, data, headers);
    return await this.errorHandler(res);
  }

  public async delete(id: number) {
    const res = await DELETE(this.baseUrl + "/" + id);
    return await this.errorHandler(res);
  }

  protected async errorHandler(res: ApiResponse<T>) {
    if (res.code == 401 || res.code == 403) {
      await navigate("/auth/admin/login");
    }
    return res;
  }
}
