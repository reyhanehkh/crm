import React from "react";
import InputWrapper from "./input-wrapper";

export interface TextfieldProps {
  label: string;
  helpNote?: string;
  value: string;
}

const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  ({ label, helpNote, value }, ref) => {
    return (
      <InputWrapper label={label} helpNote={helpNote}>
        <div className="form-control col-sm-8 col-md-6" ref={ref}>
          <span>{value}</span>
        </div>
      </InputWrapper>
    );
  }
);

export default Textfield;
