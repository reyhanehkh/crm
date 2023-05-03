import { useContext } from "react";
import AuthContext from "../../components/auth-context";
import InfoItem from "./info-item";
import moment from "moment-jalaali";
import InfoTable from "./info-table";

export interface ISettingsProps {}

export default function Settings(props: ISettingsProps) {
  const context = useContext(AuthContext);
  const c = context.customerInfo!;
  return (
    c && (
      <>
        <InfoTable
          icon="user"
          iconClass="text-blue"
          title="مشخصات کاربر"
          to={"password"}
        >
          <InfoItem
            icon="mobile-alt"
            iconClass="text-success"
            title="نام کاربری"
            value={c.cellPhone}
          />
          <InfoItem
            icon="lock"
            iconClass="text-purple"
            title="پسورد"
            value="***********"
          />
        </InfoTable>
        <InfoTable
          icon={["far", "id-card"]}
          iconClass="text-blue"
          title="مشخصات هویتی"
          to={"identity"}
        >
          <InfoItem
            icon="user-circle"
            iconClass="text-blue"
            title="نام"
            value={c.name}
          />
          <InfoItem
            icon="user-friends"
            iconClass="text-purple"
            title="نام پدر"
            value={c.fatherName}
          />
          <InfoItem
            icon="calendar-day"
            iconClass="text-orange-d1"
            title="تاریخ تولد"
            value={moment(c.birthDate, "jYYYYjMMjDD").format("jYYYY/jMM/jDD")}
          />
          <InfoItem
            icon={["far", "id-card"]}
            iconClass="text-secondary-d3"
            title="کد ملی"
            value={c.nationalCode}
          />
        </InfoTable>
        <InfoTable
          icon="address-book"
          iconClass="text-blue"
          title="اطلاعات تماس"
          to={"address"}
        >
          <InfoItem
            icon="mobile-alt"
            iconClass="text-success"
            title="تلفن همراه"
            value={c.cellPhone}
          />
          <InfoItem
            icon={["far", "envelope"]}
            iconClass="text-blue"
            title="ایمیل"
            value={c.email}
          />
          <InfoItem
            icon="phone"
            iconClass="text-purple"
            title="تلفن"
            value={c.phone}
          />
          <InfoItem
            icon="map-marker"
            iconClass="text-orange-d1"
            title="آدرس"
            value={c.address}
          />
        </InfoTable>
      </>
    )
  );
}
