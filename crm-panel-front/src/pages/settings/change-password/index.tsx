import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomerApi from "../../../api/customer";
import AuthContext from "../../../components/auth-context";
import useAppNavigate from "../../../components/router/use-app-navigate";
import Form from "../../../components/inputs/form";
import Password from "../../../components/inputs/password";
import Submit from "../../../components/inputs/submit";

interface RequestForm {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface IChangePasswordProps {}

export default function ChangePassword(props: IChangePasswordProps) {
  const context = useContext(AuthContext);
  const { register, handleSubmit } = useForm<RequestForm>();
  const navigate = useAppNavigate();

  const onSubmit: SubmitHandler<RequestForm> = ({
    currentPassword,
    password,
    rePassword,
  }) => {
    if (password !== rePassword)
      return new Promise((resolve) =>
        resolve("کلمه عبور و تکرار آن یکسان نیستند")
      );
    const customerApi = new CustomerApi(context);
    return customerApi
      .put({ currentPassword, password })
      .then(({ errorMessage }) => {
        if (!errorMessage) {
          navigate("../");
        }
        return errorMessage;
      });
  };

  return (
    <Form submit={onSubmit} handleSubmit={handleSubmit}>
      <Password
        {...register("currentPassword", { required: true })}
        label="کلمه عبور جاری"
      />
      <Password
        {...register("password", { required: true })}
        label="رمز عبور جدید"
      />
      <Password
        {...register("rePassword", { required: true })}
        label="تکرار رمز عبور جدید"
      />
      <Submit />
    </Form>
  );
}
