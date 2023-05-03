import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export interface AlertProps {
  message: string;
}
function Alert({ message }: AlertProps) {
  return (
    <div className="alert bgc-red-l3 border-none border-l-4 brc-red radius-0 py-1 text-80 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
      <FontAwesomeIcon
        icon="exclamation-triangle"
        className="mr-2 text-danger-m1 align-middle"
      />
      {message}
    </div>
  );
}

export default Alert;
