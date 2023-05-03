import moment, { Moment } from "moment-jalaali";
import { DOMAttributes, forwardRef, useState } from "react";
import DatePicker2 from "react-datepicker2";
import InputWrapper from "./input-wrapper";

export interface DatePickerProps {
  onChange?: (date: Moment) => void;
  onBlur?: DOMAttributes<HTMLInputElement>["onBlur"];
  label: string;
  helpNote?: string;
  value?: Moment;
  min?: Moment;
  max?: Moment;
}
var d = { showTodayButton: false, setTodayOnBlur: false };
const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ onChange, onBlur, label, helpNote, value, min, max }, ref) => {
    return (
      <InputWrapper label={label} helpNote={helpNote}>
        <DatePicker2
          min={min}
          max={max}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          className="form-control col-sm-8 col-md-6"
          isGregorian={false}
          timePicker={false}
          inputFormat="jYYYY/jMM/jDD"
          {...d}
        />
      </InputWrapper>
    );
  }
);

export default DatePicker;
