import AppLink from "../router/app-link";

export interface CartMenuItemProps {
  type: string;
  titles: string[];
  id: string;
  onCancel: () => void;
}
function CartMenuItem({ type, titles, id, onCancel }: CartMenuItemProps) {
  return (
    <span title="تکمیل خرید">
      <div className="clearfix">
        <p>
          <strong className="blue">
            <i className="ace-icon fa fa-shopping-basket"></i>
            {" " + type}
          </strong>
        </p>
        {titles.map((title) => (
          <p key={title}>{title}</p>
        ))}
        <p style={{ marginRight: "10px" }}>
          <AppLink className="btn btn-xs btn-success" to={`/payment/${id}`}>
            پرداخت
          </AppLink>{" "}
          <button className="btn btn-xs btn-danger" onClick={onCancel}>
            لغو خرید
          </button>
        </p>
      </div>
    </span>
  );
}

export default CartMenuItem;
