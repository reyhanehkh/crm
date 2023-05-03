import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import AppLink from "../router/app-link";

function ServicesDropdown() {
  return (
    <div className="navbar-content">
      <Dropdown className="dd-backdrop dd-backdrop-none-md">
        <Dropdown.Toggle
          id="id-nav-post-btn"
          variant="outline-primary"
          size="sm"
          className="btn-bold mx-2 px-2 px-lg-3 radius-round"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon="plus" className="mr-lg-1" />
          <span className="d-none d-lg-inline">تمدید/ارتقا</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right dropdown-animated brc-primary-m3 radius-2 py-2 py-md-0 dd-slide-up dd-slide-none-md">
          <div className="dropdown-inner">
            <Dropdown.Header className="d-md-none">
              خدمت درخواستی:
            </Dropdown.Header>
            <Dropdown.Item
              className="btn-h-light-primary btn-a-light-primary"
              as={AppLink}
              to="/purchase/service"
            >
              <FontAwesomeIcon
                icon="circle"
                className="text-primary-m2 text-75 mr-1"
              />
              خرید سرویس
            </Dropdown.Item>
            <Dropdown.Item
              className="btn-h-light-success btn-a-light-success"
              as={AppLink}
              to="purchase/packages"
            >
              <FontAwesomeIcon
                icon="circle"
                className="text-success-m2 text-75 mr-1"
              />
              خرید ترافیک
            </Dropdown.Item>
            <Dropdown.Item
              className="btn-h-light-purple btn-a-light-purple"
              as={AppLink}
              to="purchase/ip"
            >
              <FontAwesomeIcon
                icon="circle"
                className="text-purple-m2 text-75 mr-1"
              />
              درخواست IP ثابت
            </Dropdown.Item>
            <Dropdown.Item
              className="btn-h-light-primary btn-a-light-primary"
              as={AppLink}
              to="request"
            >
              <FontAwesomeIcon
                icon="circle"
                className="text-primary-m2 text-75 mr-1"
              />
              درخواست خط جدید
            </Dropdown.Item>
            {/* <Dropdown.Item
                className="btn-h-light-success btn-a-light-success"
                href="#"
              >
                <FontAwesomeIcon
                  icon="circle"
                  className="text-success-m2 text-75 mr-1"
                />
                ارتقای سرویس
              </Dropdown.Item> */}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
export default ServicesDropdown;
