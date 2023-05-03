import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEventHandler, FocusEventHandler, useState } from "react";
import InputWrapper from "./input-wrapper";
export interface TextboxProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name: string;
  label: string;
  helpNote?: string;
  disabled?: boolean;
}

const Filebox = React.forwardRef<HTMLInputElement, TextboxProps>(
  ({ onChange, onBlur, name, label, helpNote, disabled }, ref) => {
    const [fileName, setFileName] = useState("");

    const handleChange: (
      f: ChangeEventHandler<HTMLInputElement> | undefined
    ) => ChangeEventHandler<HTMLInputElement> = (f1) => {
      const f0: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files && e.target.files[0])
          setFileName(e.target.files[0].name);
      };

      const f: ChangeEventHandler<HTMLInputElement> = (e) => {
        f0(e);
        f1 && f1(e);
      };

      return f;
    };

    return (
      <InputWrapper label={label} helpNote={helpNote}>
        <label className="col-sm-8 col-md-6 ace-file-input p-0">
          <input
            type="file"
            className="ace-file-input"
            id="file"
            accept="image/*"
            onChange={handleChange(onChange)}
            onBlur={onBlur}
            name={name}
            ref={ref}
            disabled={disabled}
          />
          <div className="ace-file-container d-flex flex-column border-1 brc-grey-l2 brc-h-warning-m1">
            <div className="ace-file-placeholder h-100">
              <span className="ace-file-icon mt-3px mx-2px   ">
                <FontAwesomeIcon
                  icon="upload"
                  className="bgc-grey-m1 text-white text-center w-4 py-2"
                  size="2x"
                />
              </span>
              <span className="ace-file-name text-grey-m2 px-1">
                {fileName || "هیچ فایلی انتخاب نشده است"}
              </span>
              <span className="ace-file-btn ml-auto bgc-default text-white px-2 pt-2 text-90 my-1px mr-1px">
                بارگذاری
              </span>
            </div>
          </div>
          <span
            title=""
            className="remove position-rc text-danger mr-n25 w-3 radius-2 border-1 brc-h-danger-m4 text-center"
          >
            <FontAwesomeIcon icon="times" />
          </span>
        </label>
      </InputWrapper>
    );
  }
);

export default Filebox;
