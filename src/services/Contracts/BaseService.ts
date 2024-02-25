import { Http } from "@/Http/Http";
import { ApiResult } from "@/Http/Response";

export class BaseService<T> {
  public baseUrl: string = "/";

  public indexPaginated(params?: {}): Promise<ApiResult<T>> {
    return Http.make().get(this.baseUrl, undefined, params);
  }

  public show(id: number | string, params?: {}): Promise<ApiResult<T>> {
    return Http.make().get(this.baseUrl + `${id}`, undefined, params);
  }

  public store(data: any, params?: {}): Promise<ApiResult<T>> {
    return Http.make().post(data, this.baseUrl, undefined, params);
  }

  public update(data: any, params?: {}): Promise<ApiResult<T>> {
    return Http.make().put(data, this.baseUrl, undefined, params);
  }

  public delete(id: number | string, params?: {}): Promise<ApiResult<T>> {
    return Http.make().delete(this.baseUrl, undefined, params);
  }
}
