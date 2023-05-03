import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent } from "react";
import { Button, Col, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ActiveTab } from ".";
import Alert from "./alert";

interface ILoginTabProps {
  customerType: string;
  username: string;
  password: string;
  handleLogin: (e: FormEvent) => void;
  alert: boolean;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setActiveTab: (activeTab: ActiveTab) => void;
}

const LoginTab: React.FunctionComponent<ILoginTabProps> = ({
  customerType,
  username,
  password,
  alert,
  handleLogin,
  setUsername,
  setPassword,
  setActiveTab,
}) => {
  const { t } = useTranslation();

  return (
    <Tab.Pane className="mh-100 px-3 px-lg-0 pb-3" eventKey="login">
      <div className="text-secondary-m1 my-4 text-center">
        <a href="//www.sepanta.com">
          <img src="//c.sepanta.com/i1/a/a/logo3.png" alt="Sepanta Logo" />
        </a>
        <h1 className="text-110 mt-4">
          <span className="text-dark-tp3">
            {t(`Login.Welcome.${customerType}`)}
          </span>
        </h1>
      </div>
      {alert && <Alert message={t("Login.Error")} />}
      <form
        autoComplete="off"
        className="form-row mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          return handleLogin(e);
        }}
      >
        <div className="form-group col-sm-10 offset-sm-1 col-md-8 offset-md-2">
          <div className="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
            <input
              placeholder={t(`Login.Username.${customerType}`)}
              type="text"
              className="form-control form-control-lg pl-4 shadow-none"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FontAwesomeIcon icon="user" className="text-grey-m2 mr-n4" />
            <label
              className="floating-label text-grey-l1 ml-n3"
              htmlFor="username"
            >
              {t(`Login.Username.${customerType}`)}
            </label>
          </div>
        </div>

        <div className="form-group col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-2 mt-md-1">
          <div className="d-flex align-items-center input-floating-label text-blue brc-blue-m2">
            <input
              placeholder={t("Login.Password")}
              type="password"
              className="form-control form-control-lg pl-4 shadow-none"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon icon="key" className="text-grey-m2 mr-n4" />
            <label
              className="floating-label text-grey-l1 ml-n3"
              htmlFor="password"
            >
              {t("Login.Password")}
            </label>
          </div>
        </div>
        <Col
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          className="form-group"
        >
          <Button
            as="input"
            type="submit"
            variant="orange"
            block
            className="radius-round px-4 btn-bold mt-2 mb-4"
            value={t("Login.Submit")}
          />
        </Col>
      </form>
      <div className="form-row">
        <Col
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div className={`p-0 px-md-2 my-3`}>
            <Button
              variant="link"
              className={`text-primary-m1 text-95 text-600 mx-1`}
              onClick={() => setActiveTab("forgot")}
            >
              {t("Login.ForgotPassword")}
            </Button>
          </div>
        </Col>
        <Col
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div className={`p-0 px-md-2 text-dark-tp3"} my-3`}>
            {t("Login.Signup.Desc")}
            <a
              className={`text-success-m1 text-600 mx-1`}
              href="https://internet.sepanta.com/signup"
            >
              {t("Login.Signup.Link")}
            </a>
          </div>
        </Col>
      </div>
    </Tab.Pane>
  );
};

export default LoginTab;
