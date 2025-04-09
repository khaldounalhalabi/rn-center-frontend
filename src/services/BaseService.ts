import { Navigate } from "@/Actions/navigate";
import { DELETE, GET, POST, PUT } from "@/Http/Http";
import { ApiResponse } from "@/Http/Response";
import { Actors } from "@/types";
import { deleteCookieServer, getCookieServer } from "@/Actions/serverCookies";
import { Role } from "@/enum/Role";

export class BaseService<T> {
  protected static instance?: BaseService<any>;
  public baseUrl = "/";
  public actor: string = "customer";
  protected headers: Record<string, any> = {};

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

  public setHeaders(headers: Record<string, any> = {}) {
    this.headers = headers;
    return this;
  }

  public getBaseUrl() {
    return "/";
  }

  public setBaseUrl(url: string): BaseService<T> {
    this.baseUrl = url;
    return this;
  }

  public async all(): Promise<ApiResponse<T[]>> {
    const res: ApiResponse<T[]> = await GET<T[]>(
      this.baseUrl + "/all",
      undefined,
      this.headers,
    );
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
    const res: ApiResponse<T[]> = await GET<T[]>(
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

    return await this.errorHandler(res);
  }

  public async store(data: any, headers?: object): Promise<ApiResponse<T>> {
    const res: ApiResponse<T> = await POST<T>(this.baseUrl, data, {
      ...headers,
      ...this.headers,
    });
    return await this.errorHandler(res);
  }

  public async delete(id?: number): Promise<ApiResponse<boolean>> {
    let res: ApiResponse<boolean>;
    if (id) {
      res = await DELETE<boolean>(
        this.baseUrl + "/" + id,
        undefined,
        this.headers,
      );
    } else res = await DELETE<boolean>(this.baseUrl, undefined, this.headers);
    return await this.errorHandler(res);
  }

  public async show(id?: number): Promise<ApiResponse<T>> {
    if (!id) {
      await Navigate("/404");
    }
    const res = await GET<T>(this.baseUrl + "/" + id, undefined, this.headers);
    if (res.code == 404) {
      await Navigate("/404");
    }
    return await this.errorHandler(res);
  }

  public async update(
    id?: number,
    data?: any,
    headers?: object,
  ): Promise<ApiResponse<T>> {
    if (!id) {
      await Navigate("/404");
    }
    const res = await PUT<T>(this.baseUrl + "/" + id, data, {
      ...headers,
      ...this.headers,
    });
    if (res.code == 404) {
      await Navigate("/404");
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
      await deleteCookieServer("token");
      await deleteCookieServer("refresh_token");
      await deleteCookieServer("user-type");
      await deleteCookieServer("role");
      await deleteCookieServer("permissions");
      await Navigate(`/auth/${this.actor}/login`);
    }
    if (res.code == 432) {
      await deleteCookieServer("token");
      await deleteCookieServer("refresh_token");
      await deleteCookieServer("user-type");
      await deleteCookieServer("role");
      await deleteCookieServer("permissions");
      await Navigate(`/432`);
    }
    if (res.code == 430) {
      await deleteCookieServer("token");
      await deleteCookieServer("refresh_token");
      await deleteCookieServer("user-type");
      await deleteCookieServer("role");
      await deleteCookieServer("permissions");
      await Navigate(`/430`);
    }
    if (res.code == 431) {
      await deleteCookieServer("token");
      await deleteCookieServer("refresh_token");
      await deleteCookieServer("user-type");
      await deleteCookieServer("role");
      await deleteCookieServer("permissions");
      await Navigate(`/auth/${this.actor}/login`);
    }

    if (res.code == 434) {
      await deleteCookieServer("token");
      await deleteCookieServer("refresh_token");
      await deleteCookieServer("user-type");
      await deleteCookieServer("role");
      await deleteCookieServer("permissions");
      await Navigate("/auth/customer/verify-code");
    }

    if (res.code == 435) {
      if (
        (await getCookieServer("user-type")) == Role.DOCTOR &&
        (await getCookieServer("role")) == Role.CLINIC_EMPLOYEE
      ) {
        await deleteCookieServer("token");
        await deleteCookieServer("refresh_token");
        await deleteCookieServer("user-type");
        await deleteCookieServer("role");
        await deleteCookieServer("permissions");
        await Navigate(`/auth/${this.actor}/login`);
      }
      await Navigate("/auth/contract");
    }
    return res;
  }
}
