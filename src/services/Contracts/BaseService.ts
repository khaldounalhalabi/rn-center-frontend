import { Http } from "@/Http/Http";
import { ApiResult } from "@/Http/Response";

export abstract class BaseService<TResponse> {
  public baseUrl: string = "/";

  public indexPaginated(params?: {}) {
    return new Http().get(this.baseUrl, undefined, params);
  }

  public show(id: number | string, params?: {}) {
    return new Http().get(this.baseUrl + `${id}`, undefined, params);
  }

  public store(data: any, params?: {}) {
    return new Http().post(data, this.baseUrl, undefined, params);
  }

  public update(data: any, params?: {}) {
    return new Http().put(data, this.baseUrl, undefined, params);
  }

  public delete(id: number | string, params?: {}) {
    return new Http().delete(this.baseUrl, undefined, undefined, params);
  }
}
