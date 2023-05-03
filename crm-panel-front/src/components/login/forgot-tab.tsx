import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent } from "react";
import { Button, Col, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ActiveTab } from ".";
import Alert from "./alert";

interface IForgotTabProps {
  alert: boolean;
  customerType: string;
  username: string;
  setUsername: (username: string) => void;
  setActiveTab: (activeTab: ActiveTab) => void;
  handleContinue: (e: FormEvent) => void;
}

const ForgotTab: React.FunctionComponent<IForgotTabProps> = ({
  alert,
  customerType,
  username,
  setUsername,
  setActiveTab,
  handleContinue,
}) => {
  const { t } = useTranslation();

  return (
    <Tab.Pane className="mh-100 px-3 px-lg-0 pb-3" eventKey="forgot">
      <div className="position-tl ml-3 mt-2">
        <Button
          className="btn-h-light-default btn-a-light-default btn-bgc-tp"
          variant="light-default"
          onClick={() => setActiveTab("login")}
        >
          <FontAwesomeIcon icon="arrow-right" />
        </Button>
      </div>

      <Col
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        className="mt-5 px-0"
      >
        <h4 className="pt-4 pt-md-0 text-dark-tp4 border-b-1 brc-grey-l2 pb-1 text-130">
          <FontAwesomeIcon icon="key" className="text-brown-m1 mr-1" />
          {t("ForgotPassword.Title")}
        </h4>
      </Col>
      {alert && <Alert message={t("ForgotPassword.Error")} />}
      <form
        autoComplete="off"
        className="form-row mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          return handleContinue(e);
        }}
      >
        <Col
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          className="form-group"
        >
          <label className="text-secondary-d3 mb-3">
            {t("ForgotPassword.Desc")}
          </label>
          <div className="d-flex align-items-center">
            <input
              placeholder={t(`Login.Username.${customerType}`)}
              type="pass"
              className="form-control form-control-lg pl-4 shadow-none"
              id="id-recover-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FontAwesomeIcon icon="user" className="text-grey-m2 mr-n4" />
          </div>
        </Col>

        <Col
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          className="form-group mt-1"
        >
          <Button
            variant="orange"
            block
            type="submit"
            className="radius-round px-4 btn-bold mt-2 mb-4"
          >
            {t("ForgotPassword.Continue")}
          </Button>
        </Col>
      </form>

      <div className="form-row w-100">
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <hr className="brc-default-l2 mt-0 mb-2 w-100" />

          <div className="p-0 px-md-2 text-dark-tp4 my-3">
            <Button
              variant="link"
              className="text-blue-d1 text-600 btn-text-slide-x"
              onClick={() => setActiveTab("login")}
            >
              <FontAwesomeIcon
                icon="arrow-right"
                className="btn-text-2 text-110 align-text-bottom mr-2"
              />
              {t("ForgotPassword.ToLogin")}
            </Button>
          </div>
        </Col>
      </div>
    </Tab.Pane>
  );
};

export default ForgotTab;
