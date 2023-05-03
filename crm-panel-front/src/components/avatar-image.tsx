import Customer from "../types/customer";

export interface AvatarImageProps {
  customer: Customer;
  className?: string;
  width: number;
}
function AvatarImage({ customer, className, width }: AvatarImageProps) {
  let avatarSrc = "/blank.png";
  if (customer)
    switch (customer.isMale) {
      case true:
        avatarSrc = "/guy.png";
        break;
      case false:
        avatarSrc = "/gal.png";
        break;
      default:
        avatarSrc = "/company.png";
    }
  return (
    <img
      alt={customer?.name}
      src={avatarSrc}
      className={`radius-round border-2 ${className}`}
      width={width}
    />
  );
}

export default AvatarImage;
