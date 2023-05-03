import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useState } from "react";
import AppLink from "../router/app-link";

export interface MenuItemProps {
  title: string | JSX.Element;
  href?: string;
  to?: string;
  className?: string;
  active?: boolean;
  fadeable?: boolean;
  icon?: IconProp;
  iconBgc?: string;
}

const MenuItem: FunctionComponent<MenuItemProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li
      className={`nav-item ${props.className || ""}${
        props.active ? " active" : ""
      }${isExpanded ? " open" : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {props.href && (
        <a
          href={props.href}
          className={`nav-link${props.children ? " dropdown-toggle" : ""}${
            isExpanded ? "" : " collapsed"
          }`}
        >
          {props.icon && (
            <FontAwesomeIcon
              icon={props.icon}
              className={`nav-icon nav-icon-round bgc-${props.iconBgc}`}
              size="xs"
              // fontSize="1rem"
              viewBox="-200 -200 920 920"
            />
          )}
          <span className={`nav-text${props.fadeable ? " fadeable" : ""}`}>
            <span>{props.title}</span>
          </span>
          {props.children ? (
            <b>
              <FontAwesomeIcon icon="angle-right" className="caret rt-n90" />
            </b>
          ) : null}
        </a>
      )}
      {props.to && (
        <AppLink
          to={props.to}
          className={`nav-link${props.children ? " dropdown-toggle" : ""}${
            isExpanded ? "" : " collapsed"
          }`}
        >
          {props.icon && (
            <FontAwesomeIcon
              icon={props.icon}
              className={`nav-icon nav-icon-round bgc-${props.iconBgc}`}
              size="xs"
              // fontSize="1rem"
              viewBox="-200 -200 920 920"
            />
          )}
          <span className={`nav-text${props.fadeable ? " fadeable" : ""}`}>
            <span>{props.title}</span>
          </span>
          {props.children ? (
            <b>
              <FontAwesomeIcon icon="angle-right" className="caret rt-n90" />
            </b>
          ) : null}
        </AppLink>
      )}
      {props.children ? (
        <div className={`hideable submenu${isExpanded ? "" : " collapse"}`}>
          <ul className="submenu-inner">{props.children}</ul>
        </div>
      ) : null}
    </li>
  );
};
export default MenuItem;
