import { ReactNode } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export interface ModalSidebarProps {
  children: ReactNode;
  show?: boolean;
  onHide?: () => void;
}
function ModalSidebar({ children, show, onHide }: ModalSidebarProps) {
  const { t } = useTranslation();
  return (
    <>
      <div className="d-none d-lg-block">{children}</div>
      <Modal show={show} onHide={onHide} className="rtl">
        <Modal.Dialog
          scrollable
          contentClassName="brc-dark-l4 border-y-0 border-l-0 pr-lg-3"
        >
          <Modal.Header
          // className="modal-header d-lg-none"
          >
            {/* .hide header in lg+ view */}
            <h5 className="modal-title text-primary-d1">
              {t("Filter.Results")}
            </h5>
            <button type="button" className="close" onClick={onHide}>
              <span aria-hidden>×</span>
            </button>
          </Modal.Header>
          <Modal.Body className="pt-lg-1 px-1 ace-scrollbar">
            {children}
          </Modal.Body>
          <Modal.Footer
            className="modal-footer px-0  d-block mt-lg-4 position-b pos-sticky"
            style={{ zIndex: 11 }}
          >
            <div className="text-center">
              <button className="btn btn-info text-600 text-sm px-425 radius-2px mr-1 d-none d-lg-inline-block">
                {t("Apply")}
              </button>
              <a
                href="#search-filters"
                data-toggle="modal"
                className="btn btn-info text-600 text-sm px-425 radius-2px mr-1 d-lg-none"
              >
                {t("Apply")}
              </a>
              <button className="btn btn-light-secondary btn-bgc-white text-600 text-sm px-3 radius-1px">
                {t("Reset")}
              </button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
}
export default ModalSidebar;
