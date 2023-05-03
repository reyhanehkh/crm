import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import AppLink from "../router/app-link";
export interface IPageToolsProps {
  hasOpenTicket: boolean;
}
function PageTools({ hasOpenTicket }: IPageToolsProps) {
  return (
    <div className="page-tools">
      <div className="action-buttons text-nowrap">
        <OverlayTrigger overlay={<Tooltip id="0">سوابق مالی</Tooltip>}>
          <Button
            variant="light-secondary"
            className="bgc-white mx-0"
            as={AppLink}
            to="/withdraws"
          >
            <FontAwesomeIcon icon="money-bill-wave" className="text-primary" />
          </Button>
        </OverlayTrigger>{" "}
        {/* <OverlayTrigger overlay={<Tooltip id="1">چت آنلاین</Tooltip>}>
          <Button variant="light-secondary" className="bgc-white mx-0" href="#">
            <FontAwesomeIcon
              icon={["far", "comment-dots"]}
              className="text-danger"
            />
          </Button>
        </OverlayTrigger> */}
        {/* <OverlayTrigger overlay={<Tooltip id="1">ثبت تیکت پشتیبانی</Tooltip>}>
          <Button
            className="btn bgc-white d-none d-lg-inline-block btn-light-secondary mx-0"
            href="#"
          >
            <FontAwesomeIcon
              icon={["far", "envelope-open"]}
              className="text-purple-d1"
            />
          </Button>
        </OverlayTrigger> */}
        <OverlayTrigger overlay={<Tooltip id="1">خرید گیگ</Tooltip>}>
          <Button
            className="bgc-white btn-light-secondary mx-0 "
            as={AppLink}
            to="purchase/packages"
            disabled={hasOpenTicket}
          >
            <FontAwesomeIcon icon="plus-circle" className="text-green" />
            <small className="ml-2">خرید ترافیک</small>
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default PageTools;
