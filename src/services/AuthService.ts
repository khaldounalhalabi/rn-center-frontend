import { setCookie } from "@/Actions/cookies";
import { navigate } from "@/Actions/navigate";
import { POST } from "@/Http/QueryFetch";

export class AuthService {
  public async login(url: string, dataForm: object, pageType: string) {
    return await POST(url, dataForm).then((e) => {
      if (e.code == 200) {
        setCookie("token", e?.data?.token);
        setCookie("refresh_token", e?.data?.refresh_token);
        navigate(`/${pageType}`);
      }

      return e;
    });
  }
}
