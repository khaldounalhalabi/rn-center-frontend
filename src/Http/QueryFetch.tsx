import axios, { AxiosError } from "axios";
import {
  ApiError,
  ApiErrorType,
  ApiRequestError,
  ApiResponseError,
} from "@/Http/Response";

const QueryFetch = async (
  method: string,
  url: string,
  headers?: object,
  data?: object | undefined,
) => {
  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(url, headers);
        break;
      case "POST":
        response = await axios.post(url, data, headers);
        break;
      case "PUT":
        response = await axios.post(url, data, headers);
        break;
      case "DELETE":
        response = await axios.post(url, data, headers);
        break;
      default:
        response = await axios.get(url, headers);
        break;
    }

    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export default QueryFetch;

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
