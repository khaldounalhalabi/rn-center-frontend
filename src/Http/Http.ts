import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import {
  ApiError,
  ApiErrorType,
  ApiRequestError,
  ApiResponseError,
  ApiResult,
} from "@/Http/Response";

export class Http<TResponse> {
  public static baseUrl = "http://localhost/pom-back/public/api";
  public url: string = "/";

  public constructor() {}

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
  ): Promise<ApiResult<TResponse>> {
    return this.performRequest(url, "GET", headers, undefined, params);
  }

  public post(
    data: any,
    url: string,
    headers?: AxiosHeaders,
    params?: object,
  ): Promise<ApiResult<TResponse>> {
    return this.performRequest(url, "POST", headers, data, params);
  }

  public put(
    data: any,
    url: string,
    headers?: AxiosHeaders,
    params?: object,
  ): Promise<ApiResult<TResponse>> {
    return this.performRequest(url, "PUT", headers, data, params);
  }

  public delete(
    url: string,
    data: any,
    headers?: AxiosHeaders,
    params?: object,
  ): Promise<ApiResult<TResponse>> {
    return this.performRequest(url, "DELETE", headers, data, params);
  }

  private async performRequest(
    url: string,
    method: string = "GET",
    headers?: AxiosHeaders,
    data?: any,
    params?: object,
  ) {
    const config = this.setHeaders(headers)
      .setParams(params)
      .setUrl(url)
      .setData(data)
      .getConfig(method);

    try {
      let response;
      switch (method) {
        case "GET":
          response = await axios.get(this.url, config);
          break;
        case "POST":
          response = await axios.post(this.url, this.data, config);
          break;
        case "PUT":
          response = await axios.post(this.url, this.data, config);
          break;
        case "DELETE":
          response = await axios.post(this.url, this.data, config);
          break;
        default:
          response = await axios.get(this.url, config);
          break;
      }

      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  public handleError(error: AxiosError<ApiResponseError>): ApiError {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return {
            message: error.response.data.message,
            errorType: ApiErrorType.NOT_FOUND,
          } as ApiResponseError;
        case 400:
          return {
            message: error.response.data.message,
            errorType: ApiErrorType.BadRequestException,
          } as ApiResponseError;
        case 403:
          return {
            message: error.response.data.message,
            errorType: ApiErrorType.UNAUTHORIZED,
          } as ApiResponseError;
        default:
          return {
            message: error.response.data.message,
            errorType: ApiErrorType.BadRequestException,
          } as ApiResponseError;
      }
    } else if (error.request) {
      return {
        errorType: ApiErrorType.CONNECTION_ERROR,
      } as ApiRequestError;
    } else {
      return { errorType: ApiErrorType.UNKNOWN_ERROR } as ApiRequestError;
    }
  }
}
