import { ReactNode, useState } from "react";

export interface IFormProps {
  handleSubmit: (data: any) => any;
  submit: (data: any) => Promise<string>;
  children?: ReactNode;
}

export default function Form({ handleSubmit, submit, children }: IFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = (data: any) => {
    submit(data)
      .then((error) => setErrorMessage(error || ""))
      .catch(console.error);
  };
  return (
    <form className="form-horizontal col" onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <div className="validation-summary-errors">
          <span>موارد مشخص شده با رنگ قرمز را مجددا بررسی نمایید.</span>
          <ul>
            <li className="text-danger-d1">{errorMessage}</li>
          </ul>
        </div>
      )}
      {children}
    </form>
  );
}
