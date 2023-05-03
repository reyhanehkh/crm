import FileDetails from "../components/dashboard/file-details";
import ServiceSlider from "../components/dashboard/service-slider";
import { Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import moment from "moment-jalaali";
import FileApi from "../api/file";
import AuthContext from "../components/auth-context";
import PortApi from "../api/port";

export default function Dashboard() {
  var [activeFile, setActiveFile] = useState(null);
  var [portState, setPortState] = useState(null);
  var [loadingService, setLoadingService] = useState(false);
  const context = useContext(AuthContext),
    { activeFileId } = context;
  console.log("activeFileId", activeFileId);
  useEffect(() => {
    const fileApi = new FileApi(context);
    const portApi = new PortApi(context);
    if (activeFileId) {
      fileApi
        .get(activeFileId)
        .then((data) => {
          setActiveFile(data);
          setLoadingService(false);
        })
        .catch((error) => console.error("fileApi", error));
      setPortState(null);
      portApi
        .get(activeFileId)
        .then((data) => {
          console.log("portApi", data);
          var state = null;
          switch (data.portState) {
            case 2:
            case 3:
              state = "down";
              break;
            case 1:
              state = "up";
              break;
            default:
              state = null;
          }
          setPortState(state);
        })
        .catch((error) => setPortState(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFileId, loadingService]);

  const lastService = { endDate: null, startDate: null };

  if (activeFile?.activeService) {
    lastService.startDate = moment(activeFile.activeService.startDateTime);
    lastService.endDate = moment(activeFile.activeService.endDateTime);
  }
  const totalTraffic = { total: 0, remind: 0 };
  const timedConstraint = activeFile?.constraints?.find((c) => c.expireDate);
  let timedTraffic = timedConstraint
    ? {
        total: timedConstraint.totalGig,
        remind: timedConstraint.remindGig,
        remindDays: moment(timedConstraint.expireDate).diff(moment(), "days"),
      }
    : null;
  if (activeFile?.constraints) {
    totalTraffic.total = activeFile.constraints.reduce((prev, current) => {
      return current.expireDate ? prev : prev + current.totalGig;
    }, 0);
    totalTraffic.remind = activeFile.constraints.reduce((prev, current) => {
      return current.expireDate ? prev : prev + current.remindGig;
    }, 0);
  }

  const handleActivateNextService = () => {
    const fileApi = new FileApi(context);
    fileApi.terminateCurrentService(activeFileId).then(({ errorMessage }) => {
      if (!errorMessage) {
        setLoadingService(true);
      }
    });
  };
  return activeFile?.title ? (
    <Row>
      {activeFile?.activeService && (
        <ServiceSlider
          timeOfService={{
            total: lastService.endDate.diff(lastService.startDate, "days"),
            remind: lastService.endDate.diff(moment(), "days"),
          }}
          totalTraffic={totalTraffic}
          timedTraffic={timedTraffic}
        />
      )}
      <FileDetails
        activeService={
          loadingService
            ? { ...activeFile.activeService, serviceTitle: "در حال عملیات..." }
            : activeFile.activeService
        }
        preOrderedServiceTitle={
          loadingService ? "" : activeFile.preOrderedServiceTitle
        }
        hasNoRemindTraffic={totalTraffic.remind <= 0}
        status={activeFile.status}
        onActivateNextService={handleActivateNextService}
        link={portState}
      />
    </Row>
  ) : null;
}
