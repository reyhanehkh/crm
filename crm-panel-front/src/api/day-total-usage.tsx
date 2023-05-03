import { AuthContextProps } from "../components/auth-context";
import IGridFilter from "../types/grid-filters";
import { getData } from "./core";

export default class DayTotalUsageApi {
  static uri = "a/internet/DayTotalUsage";
  context: AuthContextProps;
  constructor(context: AuthContextProps) {
    this.context = context;
  }
  getAll(fileId: number, filters: IGridFilter) {
    return getData({
      uri: DayTotalUsageApi.uri,
      params: `?fileId=${fileId}`,
      filters,
      context: this.context,
    });
  }
}
