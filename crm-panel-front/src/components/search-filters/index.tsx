import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalSidebar from "./modal-sidebar";

export interface SearchFiltersProps {
  children: ReactNode;
  className: string;
}
function SearchFilters({ children, className }: SearchFiltersProps) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  return (
    <div className={className}>
      <div className="d-lg-none mb-2">
        {/* the button to toggle filters modal in small devices */}
        <button
          type="button"
          className="btn btn-block btn-outline-blue btn-sm text-600 shadow-sm py-1 py-md-2"
          onClick={() => setShow(!show)}
        >
          <span className="position-tl h-101 px-25 text-center bgc-blue-d1 pt-1 text-white">
            <FontAwesomeIcon icon="filter" className="text-110" />
          </span>
          {t("Filter.Results")}
        </button>
      </div>

      <ModalSidebar show={show} onHide={() => setShow(false)}>
        {children}
      </ModalSidebar>
    </div>
  );
}

export default SearchFilters;
