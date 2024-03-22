export enum ApiErrorType {
  CONNECTION_ERROR = "connection-error",
  UNAUTHORIZED = "unauthorized",
  UNAUTHENTICATED = "unAuthenticated",
  BadRequestException = "BadRequestException",
  UNKNOWN_ERROR = "unknown-error",
  NOT_FOUND = "not-found",
  ValidationEmail = "error-Emil",
  ValidationPassword = "error-Password",
}

export type ApiRequestError = {
  errorType: ApiErrorType;
  status: boolean;
  code: number;
  message: string;
};

export type ApiResult<T> = ApiResponse<T> | ApiError;
export type ApiError = ApiRequestError | ApiResponseError;

export interface ApiResponse<T> {
  data: T | undefined | null;
  status: boolean;
  code: number;
  paginate?: ApiResponsePagination;
  message: string;
}

export interface ApiResponseError {
  errorType: ApiErrorType;
  message: ApiResponseMessage;
  status: boolean;
  code: number;
}

export interface ApiResponseMessage {
  errors: {
    [k: string]: string[];
  };
  text: string;
}

export interface ApiResponsePagination {
  currentPage: number;
  from: number;
  to: number;
  total: number;
  per_page: number;
  total_pages: number;
  isFirst: boolean;
  isLast: boolean;
}

