import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiErrorType, ApiResponse } from "@/Http/Response";
import { getCookieServer } from "@/Actions/serverCookies";

export const GET = async (
  url: string,
  params?: object,
  headers?: object,
): Promise<ApiResponse<any>> => {
  return await queryFetch("GET", url, headers, params);
};

export const POST = async (
  url: string,
  data: any,
  headers?: object,
): Promise<ApiResponse<any>> => {
  return await queryFetch("POST", url, headers, undefined, data);
};

export const PUT = async (
  url: string,
  data: any,
  headers?: object,
): Promise<ApiResponse<any>> => {
  return await queryFetch("PUT", url, headers, undefined, data);
};

export const DELETE = async (
  url: string,
  params?: object,
  headers?: object,
): Promise<ApiResponse<any>> => {
  return await queryFetch("DELETE", url, headers, params);
};

const queryFetch = async (
  method: string,
  url: string,
  headers?: object,
  params?: object,
  data?: object | undefined,
): Promise<ApiResponse<any>> => {
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
    let response: AxiosResponse;
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
    return new ApiResponse(
      response.data.data ?? null,
      response.data.status ?? null,
      response.data.code ?? 500,
      response.data.message ?? null,
      response.data.paginate ?? null,
    );
  } catch (error: any) {
    return handleError(error);
  }
};

function handleError(error: AxiosError<ApiResponse<any>>): ApiResponse<any> {
  if (error.request) {
    if (error.response?.status == 405 && error.response?.data.code == 405) {
      return new ApiResponse<any>(
        null,
        false,
        405,
        error.response.data.message,
      );
    }
    return new ApiResponse<any>(
      null,
      false,
      error.response?.data.code ?? error.response?.status ?? 400,
      ApiErrorType.CONNECTION_ERROR,
    );
  } else {
    return new ApiResponse<any>(null, false, 400, ApiErrorType.UNKNOWN_ERROR);
  }
}
