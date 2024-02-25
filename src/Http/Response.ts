export type ApiResult<T> = SuccessApiResult<T> | ErrorResponse;

export interface SuccessApiResult<T> {
  data: T | undefined | null;
  status: boolean;
  code: number;
  paginate?: ApiResponsePagination;
}

export interface ApiResponsePagination {
  currentPage: number;
  from: number;
  to: number;
  total: number;
  per_page: number;
}

export interface ErrorResponse {
  errorType: CubeApiErrorType;
  message?: string | null | undefined;
}

export enum CubeApiErrorType {
  CONNECTION_ERROR = "connection-error",
  UNAUTHORIZED = "unauthorized",
  UNAUTHENTICATED = "unAuthenticated",
  BadRequestException = "BadRequestException",
  UNKNOWN_ERROR = "unknown-error",
  NOT_FOUND = "not-found",
}
