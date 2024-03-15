import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";
import { ApiErrorType } from "@/Http/Response";
import { useRouter } from "next/navigation";
const handleErrorType = (
  typePage: string,
  data: ApiResult<User> | undefined,
) => {
  const history = useRouter();

  // @ts-ignore
  if (data?.errorType == ApiErrorType.CONNECTION_ERROR) {
    return data?.message;
  } else {
    // @ts-ignore
    if (data?.errorType == ApiErrorType.UNAUTHORIZED) {
      return history.push(`/auth/${typePage}/login`);
    } else {
      // @ts-ignore
      if (data?.errorType == ApiErrorType.BadRequestException) {
        return history.push("/400");
      } else {
        // @ts-ignore
        if (data?.errorType == ApiErrorType.UNKNOWN_ERROR) {
          return data?.message;
        } else {
          // @ts-ignore
          if (data?.errorType == ApiErrorType.NOT_FOUND) {
            return history.push("/404");
          } else {
            // @ts-ignore
            if (data?.errorType == ApiErrorType.ValidationEmail) {
              // @ts-ignore
              return data?.message.text;
            } else {
              // @ts-ignore
              if (data?.errorType == ApiErrorType.ValidationPassword) {
                return data?.message;
              }
            }
          }
        }
      }
    }
  }
};

export default handleErrorType;
