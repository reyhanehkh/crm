import InputWrapper from "./input-wrapper";
export interface SubmitProps {
  name?: string;
}
const Submit = ({ name }: SubmitProps) => {
  return (
    <InputWrapper label="">
      <button className="btn btn-info btn-bold px-4" type="submit">
        {name || "ثبت"}
      </button>
    </InputWrapper>
  );
};

export default Submit;
