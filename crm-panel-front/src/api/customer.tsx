import { AuthContextProps } from "../components/auth-context";
import Customer from "../types/customer";
import { getData, putData } from "./core";

export default class CustomerApi {
  static uri = "a/internet/customer";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  get() {
    return getData({ uri: CustomerApi.uri, context: this.context });
  }
  put(data: Customer) {
    return putData({
      uri: CustomerApi.uri,
      context: this.context,
      data,
    });
  }
}
