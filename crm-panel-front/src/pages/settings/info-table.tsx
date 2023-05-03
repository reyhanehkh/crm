import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import AppLink from "../../components/router/app-link";

export interface IInfoTableProps {
  icon?: IconProp;
  iconClass?: string;
  title: string;
  children?: ReactNode;
  to?: string;
}

export default function InfoTable({
  icon,
  iconClass,
  title,
  children,
  to,
}: IInfoTableProps) {
  return (
    <div className="row mt-5">
      <div className="col-12 px-4 mb-3">
        <h4 className="text-dark-m3 text-140">
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={`${iconClass || ""} mr-1 w-2"`}
            />
          )}
          {` ${title} `}
          {to && (
            <AppLink to={to}>
              <FontAwesomeIcon icon="edit" className={`w-2`} fontSize={10} />
            </AppLink>
          )}
        </h4>

        <hr className="w-100 mx-auto mb-0 brc-default-l2" />

        <div className="bgc-white radius-1">
          <table className="table table table-striped-default table-borderless">
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
