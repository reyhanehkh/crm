import { AuthContextProps } from "../components/auth-context";
import { getData } from "./core";

export default class WithdrawApi {
  static uri = "Withdraw";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  getAll(page: number, rows: number) {
    return getData({
      uri: WithdrawApi.uri,
      params: `?page=${page}&rows=${rows}`,
      context: this.context,
    });
  }
}
