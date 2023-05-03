import { AuthContextProps } from "../components/auth-context";
import { getData } from "./core";

export default class PortApi {
  static uri = "port";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  get(id: number) {
    return getData({ uri: PortApi.uri, id, context: this.context });
  }
}
