import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AppLink from "../router/app-link";

export interface IPreorderServiceProps {
  preOrderedServiceTitle?: string;
  hasNoRemindTraffic: boolean;
  onActivate: () => void;
}

export default function PreorderService({
  preOrderedServiceTitle,
  hasNoRemindTraffic,
  onActivate,
}: IPreorderServiceProps) {
  hasNoRemindTraffic = true;
  const { t } = useTranslation();

  return preOrderedServiceTitle ? (
    <>
      {preOrderedServiceTitle}{" "}
      {hasNoRemindTraffic && (
        <Button variant="primary" className="mx-0 btn-xs" onClick={onActivate}>
          {t("Dashboard.PreorderService.Activate")}
        </Button>
      )}
    </>
  ) : (
    <Button
      variant="primary"
      className="mx-0 btn-xs"
      as={AppLink}
      to="/purchase/service"
    >
      {t("Dashboard.PreorderService.PurchasePreorderService")}
    </Button>
  );
}
