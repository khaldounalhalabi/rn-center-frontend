import { DELETE, GET, POST, PUT } from "@/Http/Http";
import { ApiResponse } from "@/Http/Response";
import { navigate } from "@/Actions/navigate";
import { Actors } from "@/types";

export class BaseService<T> {
  public baseUrl = "/";
  public actor: string = "customer";
  protected static instance?: BaseService<any>;

  protected constructor() {}

  public static make<Service extends BaseService<any>>(
    actor: Actors = "admin",
  ): Service {
    if (!this.instance) {
      this.instance = new this();
    }
    this.instance.actor = actor;

    this.instance.baseUrl = this.instance.getBaseUrl();

    return this.instance as Service;
  }

  public getBaseUrl() {
    return "/";
  }

  public setBaseUrl(url: string): BaseService<T> {
    this.baseUrl = url;
    return this;
  }

  public async all(): Promise<ApiResponse<T[]>> {
    const res: ApiResponse<T[]> = await GET<T[]>(this.baseUrl + "/all");
    return await this.errorHandler(res);
  }

  public async indexWithPagination(
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ): Promise<ApiResponse<T[]>> {
    const res: ApiResponse<T[]> = await GET<T[]>(this.baseUrl, {
      page: page,
      search: search,
      sort_col: sortCol,
      sort_dir: sortDir,
      per_page: per_page,
      ...params,
    });

    return await this.errorHandler(res);
  }

  public async store(data: any, headers?: object): Promise<ApiResponse<T>> {
    const res: ApiResponse<T> = await POST<T>(this.baseUrl, data, headers);
    return await this.errorHandler(res);
  }

  public async delete(id?: number): Promise<ApiResponse<boolean>> {
    if (!id) {
      await navigate("/404");
    }
    let res: ApiResponse<boolean>;
    if (id) {
      res = await DELETE<boolean>(this.baseUrl + "/" + id);
    } else res = await DELETE<boolean>(this.baseUrl);
    return await this.errorHandler(res);
  }

  public async show(id?: number): Promise<ApiResponse<T>> {
    if (!id) {
      await navigate("/404");
    }
    const res = await GET<T>(this.baseUrl + "/" + id);
    if (res.code == 404) {
      await navigate("/404");
    }
    return await this.errorHandler(res);
  }

  public async update(
    id?: number,
    data?: any,
    headers?: object,
  ): Promise<ApiResponse<T>> {
    if (!id) {
      await navigate("/404");
    }
    const res = await PUT<T>(this.baseUrl + "/" + id, data, headers);
    if (res.code == 404) {
      await navigate("/404");
    }
    return await this.errorHandler(res);
  }

  public async errorHandler<ResType>(
    res: ApiResponse<ResType>,
  ): Promise<Promise<ApiResponse<ResType>>>;

  public async errorHandler<ResType>(
    res: ApiResponse<ResType[]>,
  ): Promise<Promise<ApiResponse<ResType[]>>>;

  public async errorHandler(
    res: ApiResponse<T> | ApiResponse<T[]>,
  ): Promise<Promise<ApiResponse<T>> | Promise<ApiResponse<T[]>>> {
    if (res.code == 401 || res.code == 403) {
      await navigate("/auth/admin/login");
    }
    return res;
  }
}
