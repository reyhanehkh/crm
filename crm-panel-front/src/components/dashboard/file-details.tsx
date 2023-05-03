import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Table } from "react-bootstrap";
import { convertDate } from "../../functions";
import PreorderService from "./preorder-service";

export interface IFileDetailsProps {
  status: {
    code: number;
    title: string;
  };
  activeService?: {
    resetTrafficDateTime?: Date;
    serviceTitle: string;
    endDateTime: Date;
  };
  preOrderedServiceTitle?: string;
  hasNoRemindTraffic: boolean;
  onActivateNextService: () => void;
  link: string;
}

export default function FileDetails({
  status,
  activeService,
  preOrderedServiceTitle,
  hasNoRemindTraffic,
  onActivateNextService,
  link,
}: IFileDetailsProps) {
  console.log("link", link);

  const renderLink = (link: string) => {
    switch (link) {
      case "up":
        return <FontAwesomeIcon icon="link" className="text-success" />;
      case "down":
        return <FontAwesomeIcon icon="unlink" className="text-danger" />;
      default:
        return null;
    }
  };
  const renderBattery = (fileStatus: string | number) => {
    switch (fileStatus) {
      case 10:
      case "Active":
        return <FontAwesomeIcon icon="battery-full" className="text-success" />;
      case 11:
      case "Suspended":
        return <FontAwesomeIcon icon="battery-half" className="text-warning" />;
      default:
        return (
          <FontAwesomeIcon icon="battery-empty" className="text-secondary" />
        );
    }
  };
  return (
    <Col xs={12} sm={6} className="mb-3 mb-sm-0">
      <div className="bgc-white radius-1" style={{ minWidth: "100%" }}>
        <Table borderless striped className="default">
          <tbody>
            <tr />
            <tr>
              <td>{renderBattery(status.code)}</td>
              <td className="text-95 text-600 text-secondary-d2">
                وضعیت پرونده
              </td>
              <td className="text-dark-m3">
                <span>{status.title + " "}</span>
                {renderLink(link)}
              </td>
            </tr>
            {activeService && (
              <>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon="caret-square-right"
                      className="text-blue"
                    />
                  </td>
                  <td className="text-95 text-600 text-secondary-d2">
                    سرویس جاری
                  </td>
                  <td className="text-dark-m3 text-wrap">
                    {activeService.serviceTitle}
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon="step-forward"
                      className="text-blue-d3"
                    />
                  </td>
                  <td className="text-95 text-600 text-secondary-d2">
                    سرویس بعدی
                  </td>
                  <td className="text-dark-m3">
                    <PreorderService
                      preOrderedServiceTitle={preOrderedServiceTitle}
                      hasNoRemindTraffic={hasNoRemindTraffic}
                      onActivate={onActivateNextService}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon={["far", "clock"]}
                      className="text-secondary"
                    />
                  </td>
                  <td className="text-95 text-600 text-secondary-d2">
                    اتمام سرویس
                  </td>
                  <td className="text-dark-m3">
                    {convertDate(activeService.endDateTime)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon
                      icon="history"
                      className="text-secondary"
                    />
                  </td>
                  <td className="text-95 text-600 text-secondary-d2">
                    ریست ترافیک
                  </td>
                  <td className="text-dark-m3">
                    {convertDate(activeService.resetTrafficDateTime) || "---"}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      </div>
    </Col>
  );
}
