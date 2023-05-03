import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Dropdown, Nav, Navbar as BsNavbar } from "react-bootstrap";
import PurchaseTicketApi from "../../api/purchase-ticket";
import Customer from "../../types/customer";
import PurchaseTicket from "../../types/purchase-ticket";
import AuthContext from "../auth-context";
import AvatarImage from "../avatar-image";
import AppLink from "../router/app-link";
import CartMenuItem from "./cart-menu-item";
import ServicesDropdown from "./services-dropdown";
import ShoppingCardItem, { SpanToggle } from "./shopping-card-item";

export interface NavbarProps {
  customer: Customer;
  isCollapsed: boolean;
  onCollapse: (isCollpased: boolean) => void;
  openTickes: PurchaseTicket[];
  onTicketChange: () => void;
}

function Navbar({
  customer,
  isCollapsed,
  onCollapse,
  openTickes,
  onTicketChange,
}: NavbarProps) {
  const context = useContext(AuthContext);
  return (
    <BsNavbar expand="lg" className="navbar-sm navbar-fixed navbar-white2">
      <div className="navbar-inner shadow-md">
        <div className="d-flex h-100 justify-content-xl-between align-items-center">
          <button
            type="button"
            className={`btn btn-burger collapsed d-flex burger-arrowed static  ml-2  d-xl-none ${
              isCollapsed && "collapsed"
            }`}
            aria-controls="sidebar"
            aria-label="Toggle sidebar"
            onClick={() => onCollapse(!isCollapsed)}
          >
            <span className="bars text-grey-m2"></span>
          </button>
          <BsNavbar.Brand
            className="d-xl-none mx-1 text-grey-d3 text-130"
            as={AppLink}
            to={"/"}
          >
            <img
              alt="logo"
              className="logo mobile"
              src="http://c.sepanta.com/i1/Logos/SepantaLogo.png"
              style={{ height: "35px" }}
            />
            <span className="mainTitle">سپنتا</span>
            <small>
              <span className="d-none d-sm-inline-block subTitle">
                (اینترنت)
              </span>
            </small>
          </BsNavbar.Brand>
          <button
            type="button"
            className={`btn text-grey-m2 btn-burger align-self-center mx-2 d-none d-xl-flex btn-h-light-primary ${
              isCollapsed && "collapsed"
            }`}
            aria-controls="sidebar"
            aria-label="Toggle sidebar"
            onClick={() => onCollapse(!isCollapsed)}
          >
            <span className="bars"></span>
          </button>
        </div>
        <ServicesDropdown />
        <BsNavbar.Toggle
          className="ml-1 mr-2 px-1"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navbar menu"
        >
          <AvatarImage
            customer={customer}
            width={36}
            className="p-1px brc-primary-tp3 mx-0"
          />
        </BsNavbar.Toggle>
        <BsNavbar.Collapse className="navbar-menu collapse navbar-backdrop">
          <Nav as="div" className="navbar-nav">
            <ul className="nav has-active-border">
              <ShoppingCardItem>
                {openTickes.map((t) => (
                  <CartMenuItem
                    type={t.type}
                    titles={t.titles}
                    id={t.id}
                    onCancel={() => {
                      const purchaseTicketApi = new PurchaseTicketApi(context);
                      purchaseTicketApi.delete(t.id);
                      onTicketChange();
                    }}
                  />
                ))}
              </ShoppingCardItem>
              <Dropdown as="li" className="nav-item dropdown-mega">
                <Dropdown.Toggle
                  as={SpanToggle}
                  className="nav-link pl-lg-3 pr-lg-4"
                >
                  <FontAwesomeIcon icon="bell" className="text-110 mr-lg-2" />
                  <span className="d-inline-block d-lg-none ml-2">
                    اعلان‌ها
                  </span>
                  {/* <span
                        id="id-navbar-badge1"
                        className="badge badge-info radius-round text-75">
                        3
                    </span> */}
                  <FontAwesomeIcon
                    icon="angle-right"
                    className="caret d-block d-lg-none"
                  />
                </Dropdown.Toggle>
              </Dropdown>
            </ul>
          </Nav>
        </BsNavbar.Collapse>
      </div>
    </BsNavbar>
  );
}
export default Navbar;
