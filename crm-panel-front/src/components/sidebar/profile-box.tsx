import Customer from "../../types/customer";
import AvatarImage from "../avatar-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { localizeNumbers } from "../../functions";
import { useContext, useState } from "react";
import AuthContext from "../auth-context";
import AuthApi from "../../api/auth";
import AppLink from "../router/app-link";

export interface ProfileBoxProps {
  customer: Customer;
}
function ProfileBox({ customer }: ProfileBoxProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const context = useContext(AuthContext);
  const logout = () => {
    const authapi = new AuthApi(context);
    authapi.logout();
  };
  return (
    <div className="sidebar-section-item fadeable-left fadeable-top">
      <div className="fadeinable">
        <AvatarImage
          customer={customer}
          width={48}
          className="p-2px brc-primary-tp2"
        />
      </div>
      <div className="fadeable hideable">
        <div className="py-2 d-flex flex-column align-items-center">
          <div>
            <AvatarImage
              customer={customer}
              width={64}
              className="p-2px brc-primary-tp2"
            />
          </div>
          <div className="text-center mt-1" id="id-user-info">
            <button
              className={`btn vtn-link d-style pos-rel accordion-toggle px-1 py-2px text-blue-d2 bgc-h-secondary-l1 ${
                isCollapsed && "collapsed"
              }`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <span className="text-95 font-bolder">{customer?.name}</span>{" "}
              <FontAwesomeIcon
                icon="caret-up"
                className="text-90 d-collapsed"
              />
              <FontAwesomeIcon
                icon="caret-down"
                className="text-90 d-n-collapsed"
              />
            </button>
            <div className="text-muted text-80">
              {localizeNumbers(customer?.cellPhone!)}
            </div>
          </div>

          <div
            className={`collapse ${isCollapsed && "show"}`}
            id="id-user-menu"
          >
            <div className="mt-3">
              <button className="btn py-2 px-1 btn-light-blue btn-brc-white btn-h-blue btn-a-blue radius-round border-2 shadow-sm">
                <FontAwesomeIcon icon="envelope" className="w-4 opacity-1" />
              </button>{" "}
              <AppLink
                to="settings"
                className="btn py-2 px-1 btn-light-blue btn-brc-white btn-h-blue btn-a-blue radius-round border-2 shadow-sm"
              >
                <FontAwesomeIcon icon="cog" className="w-4 opacity-1" />
              </AppLink>{" "}
              <button
                onClick={() => logout()}
                className="btn static py-2 px-1 btn-light-blue btn-brc-white btn-h-blue btn-a-blue radius-round border-2 shadow-sm"
              >
                <FontAwesomeIcon icon="power-off" className="w-4 opacity-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBox;
