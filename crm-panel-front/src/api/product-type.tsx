import { AuthContextProps } from "../components/auth-context";
import { getData } from "./core";

export default class ProductTypeApi {
  static uri = "productType";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  get(id: number, fileId: number) {
    return getData({
      uri: ProductTypeApi.uri,
      id,
      params: `?lineId=${fileId}`,
      context: this.context,
    });
  }
}
