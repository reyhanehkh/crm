import React, { ChangeEventHandler, FocusEventHandler } from "react";
import InputWrapper from "./input-wrapper";

export interface TextareaProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onBlur?: FocusEventHandler<HTMLTextAreaElement> | undefined;
  name: string;
  label: string;
  helpNote?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ onChange, onBlur, name, label, helpNote }, ref) => {
    return (
      <InputWrapper label={label} helpNote={helpNote}>
        <textarea
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

export default Textarea;
