import { DELETE, GET, POST, PUT } from "@/Http/QueryFetch";
import { ApiResponse } from "@/Http/Response";
import { navigate } from "@/Actions/navigate";
import { AuthService } from "@/services/AuthService";

export class BaseService<T> implements IBaseServiceInterface<T> {
  public baseUrl = "/";
  public actor = "clinic";

  public static instance?: any | null | undefined = null;

  constructor() {}

  public static make(): BaseService<any> {
    if (!this.instance) {
      this.instance = new this();
    }

    this.instance.actor = AuthService.getCurrentActor();

    return this.instance;
  }

  public setBaseUrl(url: string) {
    this.baseUrl = url;
    return this;
  }

  public async all() {
    const res = await GET(this.baseUrl + "/all");
    return await this.errorHandler(res);
  }

  public async indexWithPagination(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<T> | ApiResponse<T[]>> {
    const res = await GET(this.baseUrl, {
      page: page,
      search: search,
      sort_col: sortCol,
      sort_dir: sortDir,
      per_page: per_page,
      ...params,
    });

    return await this.errorHandler(res);
  }

  public async store(
    data: any,
    headers?: object,
  ): Promise<ApiResponse<T> | ApiResponse<T[]>> {
    const res = await POST(this.baseUrl, data, headers);
    return await this.errorHandler(res);
  }

  public async delete(id?: number) {
    let res;
    if (id) {
      res = await DELETE(this.baseUrl + "/" + id);
    } else res = await DELETE(this.baseUrl);
    return await this.errorHandler(res);
  }

  public async show(id: number): Promise<ApiResponse<T> | ApiResponse<T[]>> {
    const res = await GET(this.baseUrl + "/" + id);
    if (res.code == 404) {
      await navigate("/404");
    }
    return await this.errorHandler(res);
  }

  public async update(id: number, data: any, headers?: object) {
    const res = await PUT(this.baseUrl + "/" + id, data, headers);
    if (res.code == 404) {
      await navigate("/404");
    }
    return await this.errorHandler(res);
  }

  public async errorHandler(res: ApiResponse<T> | ApiResponse<T[]>) {
    if (res.code == 401 || res.code == 403) {
      await navigate("/auth/admin/login");
    }
    return res;
  }
}

export interface IBaseServiceInterface<T> {
  all: () => Promise<ApiResponse<T> | ApiResponse<T[]>>;

  delete: (id?: number) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  errorHandler: (
    res: ApiResponse<T> | ApiResponse<T[]>,
  ) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  indexWithPagination: (
    page: number,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  show: (id: number) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  store: (
    data: any,
    headers?: object,
  ) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
  update: (
    id: number,
    data: any,
    headers?: object,
  ) => Promise<ApiResponse<T> | ApiResponse<T[]>>;
}
