import { AuthContextProps } from "../components/auth-context";
import { deleteData, getData, postData } from "./core";

export default class PurchaseTicketApi {
  static uri = "PurchaseTicket";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  getAll() {
    return getData({
      uri: PurchaseTicketApi.uri,
      context: this.context,
    });
  }

  post(fileId: number, productId: number, productType: number) {
    return postData({
      uri: PurchaseTicketApi.uri,
      data: {
        fileId,
        productId,
        productType,
      },
      context: this.context,
    });
  }

  delete(id: string) {
    return deleteData({
      uri: PurchaseTicketApi.uri,
      id: id,
      context: this.context,
    });
  }
}
