export default interface ProductTypeSpecs {
  [id: string]: ProductTypeSpec;
}

export enum SpecDisplay {
  None = 0,
  CheckBox = 1,
  RadioButton = 2,
  DropDown = 3,
  Slider = 4,
}

export interface ProductTypeSpec {
  id: number;
  unit: string | null;
  description: string | null;
  title: string;
  icon: string;
  values: { [id: string]: string };
  selectedValues: null | string[];
  range: null | number[];
  selectedRange: null | number[];
  display: SpecDisplay;
}
