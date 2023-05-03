import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown } from "react-bootstrap";
export interface TitleProps {
  files: [
    {
      id: number;
      title: string;
      comment: string;
    }
  ];
  currentId: string;
  onChange: (selectedId: string | null, currentId: string | null) => void;
  onEdit: () => void;
}

export default function Title({
  files,
  currentId,
  onChange,
  onEdit,
}: TitleProps) {
  const activeFile = files?.find((file) => file.id.toString() === currentId);
  const getFileTitle = ({
    title,
    comment,
  }: {
    title: string;
    comment: string;
  }) => comment || title;
  return (
    <h1 className="text-dark-m3 pb-0 mb-1 text-130">
      <div className={files.length === 1 ? "" : "btn-group"}>
        <span className="d-none d-lg-inline">داشبورد</span>{" "}
        {files.length === 1 ? (
          <small> {getFileTitle(files[0])}</small>
        ) : (
          <Dropdown
            className="dropdown dd-backdrop dd-backdrop-none-md ml-3"
            onSelect={(selectedId) => onChange(selectedId, currentId)}
          >
            <Dropdown.Toggle id="number" className="btn btn-sm btn-white">
              <span className="pr-2">
                {activeFile ? getFileTitle(activeFile) : "انتخاب کنید..."}
              </span>{" "}
              <FontAwesomeIcon
                icon="caret-down"
                size="lg"
                className="text-secondary"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {files &&
                files.map((file) => (
                  <Dropdown.Item
                    key={file.id}
                    className="dropdown-item"
                    eventKey={file.id}
                    as="li"
                  >
                    {getFileTitle(file)}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        {currentId && (
          <Button variant="white" size="sm" onClick={onEdit}>
            <FontAwesomeIcon icon="pen" />
          </Button>
        )}
      </div>
    </h1>
  );
}
