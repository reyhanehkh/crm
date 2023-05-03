import React, { ChangeEventHandler, FocusEventHandler } from "react";
import InputWrapper from "./input-wrapper";
export interface TextboxProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  helpNote?: string;
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
}
const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(
  (
    { onChange, onBlur, name, label, helpNote, defaultValue, disabled },
    ref
  ) => {
    return (
      <InputWrapper label={label} helpNote={helpNote}>
        <input
          defaultValue={defaultValue}
          type="text"
          className="form-control col-sm-8 col-md-6"
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
          disabled={disabled}
        />
      </InputWrapper>
    );
  }
);

export default Textbox;
