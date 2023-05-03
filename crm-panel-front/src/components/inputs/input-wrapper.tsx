import { ReactNode } from "react";
export interface InputWrapperProps {
  children: ReactNode;
  label: string;
  helpNote?: string;
}
function InputWrapper({ children, label, helpNote }: InputWrapperProps) {
  return (
    <div className="form-group row">
      <div className="col-sm-3 col-form-label text-sm-right pr-0">
        <label htmlFor="id-form-field-3" className="mb-0">
          {label}
        </label>
      </div>
      <div className="col-sm-9">
        {children}
        {helpNote && (
          <span className="form-text d-inline-block text-95 text-grey ml-sm-2">
            {helpNote}
          </span>
        )}
      </div>
    </div>
  );
}

export default InputWrapper;
