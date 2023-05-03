import { AuthContextProps } from "../components/auth-context";
import { getData, putData } from "./core";

export default class PaymentApi {
  static uri = "payment";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  get(id: string, discountCode: string) {
    return getData({
      uri: PaymentApi.uri,
      id,
      params: `?discountCode=${discountCode}`,
      context: this.context,
    });
  }

  put(
    id: string,
    discountCode: string,
    depositPay: boolean,
    creditPay: boolean
  ) {
    return putData({
      uri: PaymentApi.uri,
      data: { id, discountCode, depositPay, creditPay },
      context: this.context,
    });
  }
}
