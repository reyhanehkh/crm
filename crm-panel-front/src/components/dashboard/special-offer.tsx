import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Moment } from "moment-jalaali";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getMoneyText } from "../../functions";
import CountDownTimer from "./count-down-timer";

export interface SpecialOfferProps {
  expireDate: Moment;
  titles: string[];
  price: number;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function SpecialOffer({
  expireDate,
  titles,
  price,
  onSubmit,
  onCancel,
}: SpecialOfferProps) {
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  return (
    <Alert
      show={show}
      className="bgc-white text-dark-tp3 border-1 brc-secondary-l2 shadow-sm radius-0 py-3 d-flex align-items-start"
    >
      <div
        id="alert-border"
        className="position-tl w-102 m-n1px border-t-4 brc-pink"
      ></div>
      <div className="mr-4">
        <div
          id="alert-image"
          className="bgc-pink radius-1px shadow-sm px-4 py-25"
        >
          <FontAwesomeIcon icon="gift" className="text-180 text-white" />
        </div>
        <p className="mt-3 mb-0">
          <Button
            block
            variant="outline-primary"
            className="font-bolder py-0 px-2"
            onClick={onSubmit}
          >
            <FontAwesomeIcon icon="running" flip="horizontal" /> خرید
          </Button>
        </p>
      </div>
      <div className="text-dark-tp3">
        <Alert.Heading className="text-blue-d1 text-130">
          پیشنهاد ویژه!
        </Alert.Heading>
        {titles.map((title) => (
          <>
            {title}
            <br />
          </>
        ))}
        <strong>
          {`${getMoneyText(price).amount} ${getMoneyText(price).postFix}`}
        </strong>
        <br />
        <small>
          <FontAwesomeIcon icon={["far", "clock"]} spin />{" "}
          <CountDownTimer
            expireDate={expireDate}
            onExpire={() => setShow(false)}
          />
        </small>
      </div>
      <Button
        type="button"
        className="close align-self-start ml-auto mt-n25 mr-n2 text-pink text-150 opacity-2 bgc-h-blue-l2 radius-round px-15 pt-1px pb-3px"
        onClick={() => setShow(false)}
      >
        <span aria-hidden="true">×</span>
        <span className="sr-only">{t("Alert.Close")}</span>
      </Button>
    </Alert>
  );
}
