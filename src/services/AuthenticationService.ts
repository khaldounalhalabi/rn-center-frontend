import { Http } from "@/Http/Http";

export class AuthenticationService {
  public login(email: string, password: string) {
    const response = new Http().post({ email, password }, "/admin/login");
    response
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
}
