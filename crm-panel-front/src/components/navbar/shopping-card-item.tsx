import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Children, forwardRef, MouseEventHandler, ReactNode } from "react";
import { Dropdown } from "react-bootstrap";

export interface ShoppingCardItemProps {
  children: ReactNode;
}

export interface SpanProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLSpanElement>;
  className?: string;
}
export const SpanToggle = forwardRef<HTMLSpanElement, SpanProps>(
  ({ children, onClick, className }, ref) => (
    <span
      ref={ref}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </span>
  )
);

function ShoppingCardItem({ children }: ShoppingCardItemProps) {
  const count = children ? Children.count(children) : 0;
  return (
    <Dropdown as="li" className={`dropdown-mega nav-item`}>
      <Dropdown.Toggle as={SpanToggle} className="nav-link pl-lg-3 pr-lg-4">
        <FontAwesomeIcon
          icon="shopping-cart"
          className="text-110 icon-animated-horizontal mr-lg-2"
        />
        <span className="d-inline-block d-lg-none ml-2">سبد خرید</span>
        {count > 0 && (
          <span
            id="id-navbar-badge1"
            className="badge bgc-orange-d2 text-white radius-round text-75"
          >
            {count}
          </span>
        )}
        <FontAwesomeIcon
          icon="angle-right"
          className="caret d-block d-lg-none"
        />
      </Dropdown.Toggle>
      {count > 0 && (
        <Dropdown.Menu
          className={`shadow dropdown-animated dropdown-sm p-0 brc-primary-m3 border-b-2 bgc-white`}
        >
          {children}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}

export default ShoppingCardItem;
