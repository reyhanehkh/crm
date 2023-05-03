import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export interface ShowMoreButtonProps {
  isCollapsed: boolean;
  onChange: (isCollapsed: boolean) => void;
}
function ShowMoreButton({ isCollapsed, onChange }: ShowMoreButtonProps) {
  return (
    <div className="text-center mt-2">
      <button
        className={
          "d-style btn btn-white btn-h-lighter-primary btn-a-lighter-primary btn-xs" +
          (isCollapsed ? " collapsed" : "")
        }
        onClick={() => onChange(!isCollapsed)}
      >
        {isCollapsed ? "نمایش بیشتر" : "نمایش کمتر"}
        <FontAwesomeIcon
          icon="angle-double-down"
          className="d-collapsed mx-1"
        />
        <FontAwesomeIcon
          icon="angle-double-up"
          className="d-n-collapsed mx-1"
        />
      </button>
    </div>
  );
}

export default ShowMoreButton;
