import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IInfoItemProps {
  icon?: IconProp;
  iconClass?: string;
  title: string;
  value?: string;
}

export default function InfoItem({
  icon,
  iconClass,
  title,
  value,
}: IInfoItemProps) {
  return (
    <tr>
      <td>{icon && <FontAwesomeIcon icon={icon} className={iconClass} />}</td>
      <td className="text-95 text-600 text-secondary-d2">{title}</td>
      <td className="text-dark-m3">{value}</td>
    </tr>
  );
}
