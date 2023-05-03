import moment, { Moment } from "moment-jalaali";
import { ChangeEventHandler, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomerApi from "../../../api/customer";
import UploadApi from "../../../api/upload";
import AuthContext from "../../../components/auth-context";
import useAppNavigate from "../../../components/router/use-app-navigate";
import DatePicker from "../../../components/inputs/date-picker";
import Filebox from "../../../components/inputs/filebox";
import Form from "../../../components/inputs/form";
import Select from "../../../components/inputs/select";
import Submit from "../../../components/inputs/submit";
import Textbox from "../../../components/inputs/textbox";

interface RequestForm {
  imageId: string;
  isMale: boolean;
  firstName: string;
  lastName: string;
  fatherName: string;
  birthDate: number;
  nationalCode: string;
}

export interface IChangeIdentityProps {}

export default function ChangeIdentity(props: IChangeIdentityProps) {
  const context = useContext(AuthContext);
  const c = context.customerInfo;
  const { register, handleSubmit } = useForm<RequestForm>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileId, setFileId] = useState<number | undefined>();
  const [birthDate, setBirthDate] = useState<Moment | undefined>();
  const navigate = useAppNavigate();

  const onSubmit: SubmitHandler<RequestForm> = ({
    isMale,
    firstName,
    lastName,
    fatherName,
    nationalCode,
  }) => {
    if (!birthDate) return "وارد کردن تاریخ تولد الزامی است";
    const customerApi = new CustomerApi(context);
    return customerApi
      .put({
        isMale,
        firstName,
        lastName,
        fatherName,
        birthDate: parseInt(birthDate.format("jYYYYjMMjDD")),
        nationalCode,
        nationalCardImageId: fileId,
      })
      .then(({ errorMessage }) => {
        if (!errorMessage) {
          navigate("../");
        }
        return errorMessage;
      });
  };

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // Update the state
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
      if (file) {
        var uploadApi = new UploadApi(context);
        uploadApi.post(file).then((fileId) => {
          console.log("fileId", fileId);
          setFileId(fileId);
        });
      }
    }
  };
  console.log("birthDate", birthDate?.format("jYYYY/jMM/jDD"));
  return (
    c && (
      <Form submit={onSubmit} handleSubmit={handleSubmit}>
        <Filebox name="file" onChange={onFileChange} label="تصویر کارت ملی" />
        <Select
          {...register("isMale", { required: true })}
          label="عنوان"
          options={[
            { name: "false", value: "خانم" },
            { name: "true", value: "آقای" },
          ]}
          defaultValue={(c.isMale || false).toString()}
        />
        <Textbox
          {...register("firstName")}
          label="نام"
          defaultValue={c.firstName}
        />
        <Textbox
          {...register("lastName")}
          label="نام خانوادگی"
          defaultValue={c.lastName}
        />
        <Textbox
          {...register("fatherName", { required: true })}
          label="نام پدر"
          defaultValue={c.fatherName}
        />
        {/* <Textbox
          {...register("birthDate", { required: true })}
          label="تاریخ تولد"
          defaultValue={c.birthDate}
        /> */}
        <DatePicker
          max={moment().add(-18, "year")}
          min={moment().add(-120, "year")}
          label="تاریح تولد"
          value={birthDate || moment(c.birthDate, "jYYYYjMMjDD")}
          onChange={setBirthDate}
        />
        <Textbox
          {...register("nationalCode", { required: true })}
          label="کد ملی"
          defaultValue={c.nationalCode}
        />
        <Submit />
      </Form>
    )
  );
}
