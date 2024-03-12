import { ApiResult } from "@/Http/Response";
import { User } from "@/Models/User";

const handleErrorType = (
  status: boolean | undefined,
  data: ApiResult<User> | undefined,
) => {
  if (!status) {
    if (typeof data?.message == "string") {
      return data.message;
    } else {
      return data?.message.text;
    }
  }
};

export default handleErrorType;
