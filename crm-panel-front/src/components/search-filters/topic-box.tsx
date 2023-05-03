import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export interface TopicBoxProps {
  children: ReactNode;
  title: string;
}

function TopicBox({ children, title }: TopicBoxProps) {
  return (
    <div className="card acard">
      <div className="card-header border-0 py-0">
        <span
          data-action="toggle"
          className="d-flex d-style w-100 align-items-center px-2 py-1 text-grey-d1 text-105 bgc-h-primary-l3 radius-1 no-underline"
        >
          <span className="d-collapsed">{title}</span>
          <span className="d-n-collapsed text-dark-m3 text-600 ">{title}</span>
          {/* <FontAwesomeIcon icon="angle-up" className="ml-auto mr-1" /> */}
        </span>
      </div>
      <div className="card-body py-0 px-25">{children}</div>
    </div>
  );
}

export default TopicBox;
