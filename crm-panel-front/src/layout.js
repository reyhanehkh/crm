import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Title from "./components/title";
import Footer from "./components/footer";
import PageTools from "./components/dashboard/page-tools";
import { Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import SpecialOffer from "./components/dashboard/special-offer";
import FileApi from "./api/file";
import AuthContext from "./components/auth-context";
import CustomerApi from "./api/customer";
import PurchaseTicketApi from "./api/purchase-ticket";
import moment from "moment-jalaali";
import ChangeTitle from "./components/change-title";

function Layout() {
  const [files, setFiles] = useState([]);
  const [hasEditRequest, setHasEditRequest] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const context = useContext(AuthContext),
    {
      activeFileId,
      setActiveFileId,
      tickets: openTickets,
      customerInfo: customer,
      setCustomerInfo: setCustomer,
    } = context;

  const getCustomerData = () => {
    const customerApi = new CustomerApi(context);
    customerApi
      .get()
      .then((data) => {
        setCustomer(data);
      })
      .catch(() => {});

    const fileApi = new FileApi(context);
    fileApi
      .getAll()
      .then((data) => {
        setFiles(data);
        let newActiveFileId =
          data.length === 1
            ? data[0].id
            : data.find((file) => file.id === activeFileId)?.id;

        if (newActiveFileId !== activeFileId) {
          setActiveFileId(newActiveFileId);
        }
      })
      .catch(() => {});

    getAllTickets();
  };

  const getAllTickets = () => {
    new PurchaseTicketApi(context)
      .getAll()
      .then(context.setTickets)
      .catch(() => {});
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getCustomerData, [activeFileId]);
  const specialTicket = openTickets.find((t) => t.isSpecial);

  const handleEditTitle = (newTitle) => {
    new FileApi(context)
      .ChangeComment(activeFileId, newTitle)
      .then(getCustomerData);
    setHasEditRequest(false);
  };

  const activeFile = files?.find((file) => file.id.toString() === activeFileId);

  return (
    <div className="body-container rtl">
      <div className="main-container">
        <Sidebar
          customer={customer}
          isCollapsed={isSidebarCollapsed}
          onCollapse={setIsSidebarCollapsed}
        />
        <div role="main" className="main-content">
          <Navbar
            customer={customer}
            isCollapsed={isSidebarCollapsed}
            onCollapse={setIsSidebarCollapsed}
            openTickes={openTickets}
            onTicketChange={getAllTickets}
          />
          <Container className="page-content">
            {specialTicket && (
              <SpecialOffer
                expireDate={moment(specialTicket.expireDate)}
                titles={specialTicket.titles}
                price={specialTicket.price}
                onSubmit={() => {}}
                onCancel={() => {}}
              />
            )}
            <div className="page-header border-0 pb-3">
              <Title
                files={files}
                currentId={activeFileId}
                onChange={(selectedFile) => setActiveFileId(selectedFile)}
                onEdit={() => setHasEditRequest(true)}
              />
              <ChangeTitle
                show={hasEditRequest}
                onEdit={handleEditTitle}
                onCancel={() => setHasEditRequest(false)}
                title={activeFile?.title}
                comment={activeFile?.comment}
              />
              {activeFileId && <PageTools />}
            </div>
            <Outlet />
          </Container>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
