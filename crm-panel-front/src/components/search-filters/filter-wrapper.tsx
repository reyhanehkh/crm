import { ProductTypeSpec, SpecDisplay } from "../../types/prtoduct-type-specs";
import CheckboxFilter from "./checkbox-filter";
import RadiobuttonFilter from "./radiobutton-filter";
import SliderFilter from "./slider-filter";

export interface IFilterWrapperProps {
  spec: ProductTypeSpec;
  selectedValuesChanges: (selectedValues: string[]) => void;
  selectedRangeChanges: (selectedValues: number[]) => void;
}

export default function FilterWrapper({
  spec,
  selectedValuesChanges,
  selectedRangeChanges,
}: IFilterWrapperProps) {
  switch (spec.display) {
    case SpecDisplay.None:
      return null;
    case SpecDisplay.CheckBox:
      console.log("CheckBox.spec", spec);
      return (
        <CheckboxFilter
          title={spec.title}
          topics={spec.values}
          selectedValues={spec.selectedValues || undefined}
          onChange={selectedValuesChanges}
        />
      );
    case SpecDisplay.RadioButton:
      return (
        <RadiobuttonFilter
          title={spec.title}
          topics={spec.values}
          selectedValues={spec.selectedValues || undefined}
          onChange={selectedValuesChanges}
        />
      );
    case SpecDisplay.Slider:
      return (
        <SliderFilter
          title={spec.title}
          range={spec.range!}
          selectedRange={spec.selectedRange || spec.range!}
          onChange={selectedRangeChanges}
        />
      );
    default:
      return null;
  }
}
