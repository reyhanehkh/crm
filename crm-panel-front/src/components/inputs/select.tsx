import React, { ChangeEventHandler, FocusEventHandler } from "react";
import InputWrapper from "./input-wrapper";
export interface SelectProps {
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  onBlur?: FocusEventHandler<HTMLSelectElement> | undefined;
  name: string;
  label: string;
  helpNote?: string;
  required?: boolean;
  options: {
    name: string;
    value: string;
  }[];
  defaultValue?: string;
}
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      onChange,
      onBlur,
      name,
      label,
      options,
      helpNote,
      required,
      defaultValue,
    },
    ref
  ) => {
    return (
      <InputWrapper label={label} helpNote={helpNote}>
        <select
          className="form-control col-sm-8 col-md-6"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          required={required}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.value}
            </option>
          ))}
        </select>
      </InputWrapper>
    );
  }
);

export default Select;
