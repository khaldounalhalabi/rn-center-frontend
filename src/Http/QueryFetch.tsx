import axios, { AxiosError } from "axios";
import {
  ApiError,
  ApiErrorType,
  ApiRequestError,
  ApiResponseError,
  ApiResult,
} from "@/Http/Response";

export const GET = async (
  url: string,
  params?: object,
  headers?: object,
): Promise<ApiResult<any>> => {
  return await queryFetch("GET", url, headers, params);
};

export const POST = async (
  url: string,
  data: any,
  headers?: object,
): Promise<ApiResult<any>> => {
  return await queryFetch("POST", url, headers, undefined, data);
};

export const PUT = async (
  url: string,
  data: any,
  headers?: object,
): Promise<ApiResult<any>> => {
  return await queryFetch("PUT", url, headers, undefined, data);
};

export const DELETE = async (
  url: string,
  params?: object,
  headers?: object,
): Promise<ApiResult<any>> => {
  return await queryFetch("DELETE", url, headers, params);
};

const queryFetch = async (
  method: string,
  url: string,
  headers?: object,
  params?: object,
  data?: object | undefined,
): Promise<ApiResult<any>> => {
  const h = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
    Authorization: `Bearer `,
  };

  const config = {
    headers: { ...headers, ...h },
    params: params,
    baseURL: process.env.localApi,
    url: url,
  };

  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, config);
        break;
      case "POST":
        response = await axios.post(url, data, config);
        break;
      case "PUT":
        response = await axios.put(url, data, config);
        break;
      case "DELETE":
        response = await axios.delete(url, config);
        break;
      default:
        response = await axios.get(url, config);
        break;
    }

    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

function handleError(error: AxiosError<ApiResponseError>): ApiError {
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
