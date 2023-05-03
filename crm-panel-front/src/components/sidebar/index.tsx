import { Navbar } from "react-bootstrap";
import Customer from "../../types/customer";
import AppLink from "../router/app-link";
import MenuItem from "./menu-item";
import ProfileBox from "./profile-box";

export interface SidebarProps {
  customer: Customer;
  isCollapsed: boolean;
  onCollapse: (isCollpased: boolean) => void;
}

function Sidebar({ customer, isCollapsed, onCollapse }: SidebarProps) {
  return (
    <div
      id="sidebar"
      className={`sidebar sidebar-fixed sidebar-backdrop expandable sidebar-lightpurple2 sidebar-spaced ${
        isCollapsed ? "collapsed" : "sidebar-visible"
      }`}
      onClick={(e) => {
        const { id } = e.target as HTMLTextAreaElement;
        if (id === "sidebar") onCollapse(true);
      }}
    >
      <div className="sidebar-inner">
        <div className="d-none d-xl-flex sidebar-section-item m-0 fadeable-left fadeable-top">
          <div className="fadeinable">
            <div
              className="py-2 mx-1 border-b-1 brc-secondary-l2"
              id="sidebar-header-brand1"
            >
              <Navbar.Brand
                as={AppLink}
                className="text-140 text-dark-tp3"
                to="/"
              >
                <img
                  className="logo collapsed brc-primary-tp2"
                  src="http://c.sepanta.com/i1/Logos/SepantaLogo.png"
                  style={{ height: "35px" }}
                  alt="logo"
                />
              </Navbar.Brand>
            </div>
          </div>
          <div className="fadeable w-100 ">
            <div
              className="py-2 text-center mx-3 border-b-1 brc-secondary-l2"
              id="sidebar-header-brand2"
            >
              <Navbar.Brand
                as={AppLink}
                className="ml-n2 text-140 text-dark-tp3"
                to="/"
              >
                <img
                  className="logo expanded brc-primary-tp2"
                  src="http://c.sepanta.com/i1/Logos/SepantaLogo.png"
                  style={{ height: "35px" }}
                  alt="logo"
                />
                <span className="mainTitle">سپنتا</span>
                <small>
                  <span className="subTitle"> (اینترنت)</span>
                </small>
              </Navbar.Brand>
            </div>
          </div>
        </div>

        <div className="pt-2 flex-grow-1 ace-scroll" data-ace-scroll="{}">
          <ProfileBox customer={customer} />
          <nav aria-label="Main">
            <ul className="nav flex-column mt-2">
              <MenuItem
                title="داشبورد"
                to="/"
                active
                fadeable
                icon="tachometer-alt"
                iconBgc="primary-tp1"
              />
              <MenuItem
                title="مالی"
                to="/withdraws"
                icon="money-bill-wave"
                iconBgc="green-tp1"
                fadeable
              >
                {/* <MenuItem title="سوابق مالی" href="#" />
                <MenuItem title="افزایش اعتبار" href="#" /> */}
              </MenuItem>
              <MenuItem
                title={
                  <>
                    خدمات <small>(اینترنت)</small>
                  </>
                }
                href=""
                icon="concierge-bell"
                iconBgc="secondary-tp1"
                fadeable
              >
                <MenuItem active title="اینترنت" href="#" />
                <MenuItem
                  title="وایرلس"
                  href="https://wireless.sepanta.com/file"
                />
              </MenuItem>
              {/* 
              <MenuItem
                title="عملیاتها"
                href="#"
                fadeable
                icon="tools"
                iconBgc="orange-tp1"
              /> */}
            </ul>
          </nav>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-item fadeable-left fadeable-top">
            <div className="fadeinable">
              <button
                type="button"
                className="btn btn-primary btn-bold radius-1"
              >
                <i className="fa fa-cloud"></i>
              </button>
            </div>
            <div
              id="sidebar-footer"
              className="fadeable text-center border-t-1 w-95 sidebar-lightblue brc-secondary-l1"
            >
              <div className="py-2">
                <button
                  type="button"
                  className="btn px-5 radius-1 btn-blue btn-bold"
                >
                  ارتقای سرویس
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
