import { FormEvent, useContext, useState } from "react";
import { Button, Col, Row, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Auth from "../../api/auth";
import AuthCodeApi from "../../api/auth-code";
import AuthContext from "../auth-context";
import ForgotTab from "./forgot-tab";
import LoginTab from "./login-tab";
import ResetTab from "./reset-tab";

export type ActiveTab = "login" | "forgot" | "reset";

const Login = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerType, setCustomerType] = useState("Person");
  const [alert, setAlert] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("login");
  const context = useContext(AuthContext);

  async function handleLogin() {
    setAlert(false);
    Auth.login({ username, password }).then((data) => {
      data.LoginId ? context.login(data.LoginId) : setAlert(true);
    });
  }

  async function handleForgot() {
    setAlert(false);
    const api = new AuthCodeApi();
    api.post({ username }).then((data) => {
      data.errorMessage ? setAlert(true) : setActiveTab("reset");
    });
  }

  async function handleReset() {
    setAlert(false);
    const api = new AuthCodeApi();
    api.put({ username, code: password }).then((data) => {
      data.errorMessage ? setAlert(true) : handleLogin();
    });
  }

  return (
    <div className="login body-container rtl">
      <div className="main-container container bgc-transparent">
        <div className="main-content minh-100 justify-content-center">
          <div className="p-2 p-md-4">
            <div className="row justify-content-center" id="row-1">
              <div
                className={`bgc-white shadow radius-1 overflow-hidden col-12 col-lg-6 col-xl-5`}
              >
                <Row id="row-2">
                  <Col xs id="id-col-main" className="py-lg-5 px-0">
                    <Tab.Container activeKey={activeTab}>
                      <Tab.Content className="tab-sliding border-0 p-0">
                        <LoginTab
                          alert={alert}
                          customerType={customerType}
                          handleLogin={handleLogin}
                          password={password}
                          username={username}
                          setActiveTab={setActiveTab}
                          setPassword={setPassword}
                          setUsername={setUsername}
                        />
                        <ForgotTab
                          alert={alert}
                          customerType={customerType}
                          username={username}
                          setActiveTab={setActiveTab}
                          setUsername={setUsername}
                          handleContinue={handleForgot}
                        />
                        <ResetTab
                          alert={alert}
                          username={username}
                          password={password}
                          setActiveTab={setActiveTab}
                          setPassword={setPassword}
                          handleContinue={handleReset}
                        />
                      </Tab.Content>
                    </Tab.Container>
                  </Col>
                  <Button
                    variant="orange"
                    className={`btn-bold btn-block`}
                    onClick={() =>
                      setCustomerType(
                        customerType === "Person" ? "Company" : "Person"
                      )
                    }
                  >
                    {t(`Login.ChangeButton.${customerType}`)}
                  </Button>
                </Row>
              </div>
            </div>
            <div className={`d-lg-none my-3 text-white-tp1 text-center`}>
              {t("Footer.CompanyTitle")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
