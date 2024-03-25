import axios, { AxiosError } from "axios";
import {
  ApiError,
  ApiErrorType,
  ApiRequestError,
  ApiResponseError,
  ApiResult,
} from "@/Http/Response";
import { getCookieServer } from "@/Actions/serverCookies";
import ignore from "ignore";

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
    Authorization: `Bearer ${await getCookieServer("token")}`,
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
        // go to page 404
        return {
          message: error.response.data.message,
          errorType: ApiErrorType.NOT_FOUND,
        } as ApiResponseError;
      case 400:
        return {
          // go to page 400
          message: error.response.data.message,
          errorType: ApiErrorType.BadRequestException,
        } as ApiResponseError;
      case 403:
        return {
          // got to log in page
          message: error.response.data.message,
          errorType: ApiErrorType.UNAUTHORIZED,
        } as ApiResponseError;
      case 405:
        return {
          // error Email
          message: error.response.data.message,
          errorType: ApiErrorType.ValidationEmail,
        } as ApiResponseError;
      case 401:
        return {
          // error Password
          message: error.response.data.message,
          errorType: ApiErrorType.ValidationPassword,
        } as ApiResponseError;
      default:
        return {
          // go to page 400
          message: error.response.data.message,
          errorType: ApiErrorType.BadRequestException,
        } as ApiResponseError;
    }
  } else if (error.request) {
    return {
      // message no network
      errorType: ApiErrorType.CONNECTION_ERROR,
    } as ApiRequestError;
  } else {
    // got to page 500
    return { errorType: ApiErrorType.UNKNOWN_ERROR } as ApiRequestError;
  }
}

export const getValidationError = (
  fieldName: string,
  response: ApiResult<any> | undefined,
) => {
  let responseError: any = response?.message;

  if (responseError?.hasOwnProperty("errors")) {
    responseError = responseError.errors;
    if (responseError?.hasOwnProperty(`${fieldName}`)) {
      responseError = responseError[`${fieldName}`];
    }
  }

  let error: string | undefined;
  if (responseError instanceof Array) {
    error = responseError[0] ?? undefined;
  } else if (responseError) {
    error = `${responseError}`;
  } else error = undefined;

  if (error) {
    return error.replace(".", " ").replace("_", " ");
  }

  return error;
};
