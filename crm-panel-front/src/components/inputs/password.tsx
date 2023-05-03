import React, { ChangeEventHandler, FocusEventHandler } from "react";
import InputWrapper from "./input-wrapper";
export interface TextboxProps {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  name: string;
  label: string;
  helpNote?: string;
}
const Password = React.forwardRef<HTMLInputElement, TextboxProps>(
  ({ onChange, onBlur, name, label, helpNote }, ref) => {
    return (
      <InputWrapper label={label} helpNote={helpNote}>
        <input
          type="password"
          className="form-control col-sm-8 col-md-6"
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
      </InputWrapper>
    );
  }
);

export default Password;
