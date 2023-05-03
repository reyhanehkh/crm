import AuthCode from "../types/auth-code";
import { postData, putData } from "./core";

export default class AuthCodeApi {
  static uri = "n/accounts/authcode";

  post(data: AuthCode) {
    return postData({
      uri: AuthCodeApi.uri,
      data,
    });
  }
  put(data: AuthCode) {
    return putData({
      uri: AuthCodeApi.uri,
      id: "_",
      data,
    });
  }
}
