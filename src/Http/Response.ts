import { UseFormReturn } from "react-hook-form";

export enum ApiErrorType {
  CONNECTION_ERROR = "connection-error",
  UNAUTHORIZED = "unauthorized",
  UNAUTHENTICATED = "unAuthenticated",
  BadRequestException = "BadRequestException",
  UNKNOWN_ERROR = "unknown-error",
  NOT_FOUND = "not-found",
  Validation = "error-validation",
  NotRegister = "not-register",
  Admin = "admin",
  Customer = "customer",
  Doctor = "doctor",
}

export interface ApiResult<T> {
  data: T | undefined | null;
  status: boolean;
  code: number;
  message?: string | ValidationError;
  paginate?: ApiResponsePagination;
}

export interface ValidationError {
  errors: {
    [k: string]: string;
  };
  text?: string;
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

export class ApiResponse<T> {
  public data: T | undefined | null;
  public status: boolean | undefined | null;
  public code: number;
  public message: string | ValidationError | undefined | null;
  public paginate: ApiResponsePagination | undefined | null;

  constructor(
    data: T | undefined | null = null,
    status: boolean = true,
    code: number = 500,
    message: string | ValidationError | undefined | null = null,
    paginate: ApiResponsePagination | undefined | null = null,
  ) {
    this.data = data;
    this.status = status;
    this.code = code;
    this.message = message;
    this.paginate = paginate;
  }

  public getValidationError(): [string, string][] | undefined {
    return this.message &&
      typeof this.message != "string" &&
      this.message?.hasOwnProperty("errors") &&
      this.code == 405
      ? Object.entries(this.message?.errors)
      : undefined;
  }

  public fillValidationErrors(useFormMethods: UseFormReturn) {
    const validationErrors = this.getValidationError();
    if (validationErrors) {
      validationErrors.forEach(([key, value]) => {
        useFormMethods.setError(`${key}`, {
          type: "backend-validation-error",
          message: `${value
            .replace(".", " ")
            .replace("_", " ")
            .replace("ids", " ")
            .replace("id", " ")}`,
        });
      });
    }
  }
}
