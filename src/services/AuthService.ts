import { navigate } from "@/Actions/navigate";
import { POST } from "@/Http/QueryFetch";
import {ApiResult} from "@/Http/Response";
import {User} from "@/Models/User";
import {setCookieServer} from "@/Actions/serverCookies";

export class AuthService {
  public async login(url: string, dataForm: object, pageType: string) {
    return await POST(url, dataForm).then((e:ApiResult<User>) => {
      if (e.code == 200) {
        // @ts-ignore
        setCookieServer("token", e?.data?.token);

        setCookieServer('locale','en')
        // @ts-ignore
        setCookieServer("refresh_token", e?.data?.refresh_token);
        navigate(`/${pageType}`);
      }

      return e;
    });
  }
}
