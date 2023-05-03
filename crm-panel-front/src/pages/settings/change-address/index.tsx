import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomerApi from "../../../api/customer";
import AuthContext from "../../../components/auth-context";
import useAppNavigate from "../../../components/router/use-app-navigate";
import Form from "../../../components/inputs/form";
import Submit from "../../../components/inputs/submit";
import Textbox from "../../../components/inputs/textbox";

interface RequestForm {
  cellPhone: string;
  phone: string;
  address: string;
  postalCode: string;
  email: string;
}
export interface IChangeAddressProps {}

export default function ChangeAddress(props: IChangeAddressProps) {
  const context = useContext(AuthContext);
  const { register, handleSubmit } = useForm<RequestForm>();
  const navigate = useAppNavigate();
  const c = context.customerInfo;

  const onSubmit: SubmitHandler<RequestForm> = ({
    cellPhone,
    phone,
    address,
    postalCode,
    email,
  }) => {
    const customerApi = new CustomerApi(context);
    return customerApi
      .put({ cellPhone, phone, address, postalCode, email })
      .then(({ errorMessage }) => {
        if (!errorMessage) {
          navigate("../");
        }
        return errorMessage;
      });
  };

  return (
    c && (
      <Form submit={onSubmit} handleSubmit={handleSubmit}>
        <Textbox
          {...register("cellPhone", { required: true })}
          label="تلفن همراه"
          defaultValue={c.cellPhone}
          disabled
        />
        <Textbox {...register("email")} label="ایمیل" defaultValue={c.email} />
        <Textbox {...register("phone")} label="تلفن" defaultValue={c.phone} />
        <Textbox
          {...register("address", { required: true })}
          label="آدرس"
          defaultValue={c.address}
        />
        <Textbox
          {...register("postalCode", { required: true })}
          label="کد پستی"
          defaultValue={c.postalCode}
        />
        <Submit />
      </Form>
    )
  );
}
