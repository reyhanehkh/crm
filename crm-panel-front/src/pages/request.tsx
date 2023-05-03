import { ChangeEvent, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FileApi from "../api/file";
import AuthContext from "../components/auth-context";
import useAppNavigate from "../components/router/use-app-navigate";
import Form from "../components/inputs/form";
import Select from "../components/inputs/select";
import Submit from "../components/inputs/submit";
import Textarea from "../components/inputs/textarea";
import Textbox from "../components/inputs/textbox";
import Textfield from "../components/inputs/textfield";
import Center from "../types/center";

interface RequestForm {
  type: string;
  phone: string;
  subCenterId: string;
  ownershipType: string;
  agentCode: string;
  installAddress: string;
}

function Request() {
  const context = useContext(AuthContext);
  const [type, setType] = useState("Adsl");
  const [city, setCity] = useState("");
  const [center, setCenter] = useState("");
  const [subCenters, setSubCenters] = useState<Center[] | null>(null);
  const { register, handleSubmit } = useForm<RequestForm>();
  const navigate = useAppNavigate();
  const onSubmit: SubmitHandler<RequestForm> = ({
    type,
    phone,
    subCenterId,
    ownershipType,
    agentCode,
    installAddress,
  }) => {
    const fileApi = new FileApi(context);
    fileApi
      .post(type, phone, subCenterId, agentCode, ownershipType, installAddress)
      .then((response) => {
        if (response && response.id) {
          context.setActiveFileId(response.id);
          navigate("/");
        } else {
          return response.errorMessage || "خطایی رخ داده است.";
        }
        return "";
      });
  };
  const handlePhoneChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    console.log("handlePhoneChange", value);
    if (parseInt(value).toString().length === 10) {
      console.log("handlePhoneChange", value, "here");
      fetch(`/api/Inquiry/${value}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        //.then(console.log)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          setCity(data.City);
          setCenter(data.Center);
          setSubCenters(
            data.SubCentersList.map((sc: { Title: string; Id: number }) => ({
              title: sc.Title,
              id: sc.Id,
            }))
          );
        })
        .catch(console.error);
    }
  };

  return (
    <Form submit={onSubmit} handleSubmit={handleSubmit}>
      <Select
        {...register("type", {
          required: true,
        })}
        label="نوع اینترنت درخواستی"
        options={[
          { name: "Adsl", value: "ADSL" },
          { name: "TdLte", value: "TD-LTE" },
        ]}
        onChange={(e) => {
          setType(e.target.value);
        }}
      />

      {type === "Adsl" && (
        <>
          <Textbox
            {...register("phone", { required: type === "Adsl" })}
            label="تلفن"
            helpNote="شماره تلفن بصورت کامل به همراه کد شهر. نمونه: ۰۲۱۸۴۲۱۱۰۰۰"
            onChange={handlePhoneChange}
          />
          {subCenters ? (
            <Select
              {...register("subCenterId", { required: type === "Adsl" })}
              label="مجتمع"
              helpNote="در صورت سکونت در هر یک از مجتمع های موجود در لیست، لطفا مجتمع محل سکونت خود را انتخاب نمایید."
              options={[
                { name: "", value: "لطفا یکی از گزینه ها را انتخاب نمایید" },
                { name: "0", value: "هیچ کدام" },
                ...subCenters.map((subCenter) => ({
                  name: subCenter.id.toString(),
                  value: subCenter.title,
                })),
              ]}
            />
          ) : (
            <input {...register("subCenterId")} type="hidden" value="0" />
          )}
          <Textfield label="شهر" value={city} />
          <Textfield label="مرکز مخابراتی" value={center} />
          <Select
            {...register("ownershipType")}
            label="نوع مالکیت"
            name="ownershipType"
            options={[
              { name: "Owner", value: "مالک" },
              { name: "Renter", value: "مستاجر" },
            ]}
          />
        </>
      )}
      <Textbox
        {...register("agentCode")}
        label="کد نمایندگی"
        helpNote="در صورتی که توسط یک نماینده جهت ثبت نام معرفی شده اید."
      />
      <Textarea
        {...register("installAddress")}
        label="آدرس نصب"
        helpNote="در صورت نیاز به نصب مودم توسط کارشناس شرکت، تعیین آدرس مراجعه مورد نیاز است."
      />
      <Submit />
    </Form>
  );
}

export default Request;
