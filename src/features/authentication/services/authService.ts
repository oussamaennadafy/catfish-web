import NetworkUtils from "@/networking/networkUtils";
import { loginRequestBody, signupRequestBody } from "../types/apiTypes";

export class AuthService {
  /**
   * @route POST /v1/user/login
   */
  public login({ email, password }: loginRequestBody) {
    return NetworkUtils.post<loginRequestBody>("/users/login", { email, password });
  }

  /**
   * @route POST /v1/user/signup
   */
  public signup({ email, name, password, passwordConfirm }: signupRequestBody) {
    return NetworkUtils.post<signupRequestBody>("/users/signup", { email, name, password, passwordConfirm });
  }

  /**
   * @route POST /v1/user/signup
   */
  public logout() {
    return NetworkUtils.get("/users/logout");
  }
}