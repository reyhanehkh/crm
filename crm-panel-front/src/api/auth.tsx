import { AuthContextProps } from "../components/auth-context";
import { postData } from "./core";
export interface AuthProps {
  username: string;
  password: string;
}
export default class AuthApi {
  static uri = "auth";
  context: AuthContextProps;

  constructor(context: AuthContextProps) {
    this.context = context;
  }

  static login(data: AuthProps) {
    return postData({ id: "login", uri: this.uri, data });
  }

  logout() {
    return postData({ id: "logout", uri: AuthApi.uri }).then((data) => {
      this.context.logout();
      return data;
    });
  }
}
