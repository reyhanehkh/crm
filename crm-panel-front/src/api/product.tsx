import { AuthContextProps } from "../components/auth-context";
import { getData } from "./core";

export default class ProductApi {
  static uri = "product";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  getAll(lineId: number, type: number) {
    return getData({
      uri: ProductApi.uri,
      params: `?lineId=${lineId}&type=${type}`,
      context: this.context,
    });
  }
}
