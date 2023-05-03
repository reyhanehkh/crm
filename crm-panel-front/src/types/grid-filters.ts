export default interface IGridFilter {
  rows: number;
  page: number;
  sidx?: string;
  sord?: "asc" | "desc";
  filters: {
    groupOp: "OR" | "AND";
    rules: IGridFilterRule[];
  };
}

export interface IGridFilterRule {
  field: string;
  op: "eq" | "cn" | "ge" | "le";
  data: any;
}
