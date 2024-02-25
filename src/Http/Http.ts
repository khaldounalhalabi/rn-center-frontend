import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { ApiResult, CubeApiErrorType, ErrorResponse } from "@/Http/Response";
import { Simulate } from "react-dom/test-utils";

export class Http<T> {
  public static baseUrl = "http://localhost/pom-back/public/api";
  public url: string = "/";
  public static instance: Http<any>;

  public constructor() {}

  public static make(): Http<any> {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  }

  public headers: any;

  public params: object | undefined;
  public data: null | undefined;
  public timeout: number = 0;

  public setHeaders(headers = {}) {
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": "en",
      Authorization: "Bearer ",
      ...headers,
      timout: this.timeout,
    };
    return this;
  }

  public setData(data: null | undefined) {
    this.data = data;
    return this;
  }

  public setParams(params: object | undefined) {
    this.params = params;
    return this;
  }

  public getConfig(method: string = "GET"): AxiosRequestConfig {
    return {
      url: this.url,
      method: method,
      headers: this.headers,
      params: this.params,
      data: this.data,
    };
  }

  public setUrl(url: string = "/") {
    if (url.startsWith("/")) {
      this.url = Http.baseUrl + url;
    } else this.url = Http.baseUrl + "/" + url;

    return this;
  }

  public get(
    url: string,
    headers?: AxiosHeaders,
    params?: object,
  ): Promise<ApiResult<T>> {
    return this.performRequest(url, "GET", headers, undefined, params);
  }

  public post(
    data: any,
    url: string,
    headers?: AxiosHeaders,
    params?: object,
  ): Promise<ApiResult<T>> {
    return this.performRequest(url, "POST", headers, data, params);
  }

  public put(
    data: any,
    url: string,
    headers?: AxiosHeaders,
    params?: object,
  ): Promise<ApiResult<T>> {
    return this.performRequest(url, "PUT", headers, data, params);
  }

  public delete(
    url: string,
    headers?: AxiosHeaders,
    params?: object,
  ): Promise<ApiResult<T>> {
    return this.performRequest(url, "DELETE", headers, null, params);
  }

  private async performRequest(
    url: string,
    method: string = "GET",
    headers?: AxiosHeaders,
    data?: any,
    params?: object,
  ): Promise<ApiResult<T>> {
    const config = this.setHeaders(headers)
      .setParams(params)
      .setUrl(url)
      .setData(data)
      .getConfig(method);

    let response;
    switch (method) {
      case "GET":
        response = axios.get(this.url, config);
        break;
      case "POST":
        response = axios.post(this.url, this.data, config);
        break;
      case "PUT":
        response = axios.put(this.url, this.data, config);
        break;
      case "DELETE":
        response = axios.delete(this.url, config);
        break;
      default:
        response = axios.get(this.url, config);
        break;
    }

    try {
      let data1 = await response;
      return await data1.data;
    } catch (error1) {
      return this.handleError(error1);
    }
  }

  public handleError(error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return {
            message: error.response.data.message,
            errorType: CubeApiErrorType.NOT_FOUND,
          } as ErrorResponse;
        case 400:
          return {
            message: error.response.data.message,
            errorType: CubeApiErrorType.BadRequestException,
          } as ErrorResponse;
        default:
          return {
            message: error.response.data.message,
            errorType: CubeApiErrorType.BadRequestException,
          } as ErrorResponse;
      }
    } else if (error.request) {
      return {
        errorType: CubeApiErrorType.CONNECTION_ERROR,
      } as ErrorResponse;
    } else {
      return { errorType: CubeApiErrorType.UNKNOWN_ERROR } as ErrorResponse;
    }
  }
}

export function isApiError(response: ApiResult<any>) {
  return "errorType" in response;
}
