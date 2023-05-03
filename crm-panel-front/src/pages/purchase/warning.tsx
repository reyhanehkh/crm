import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import PurchaseTicketApi from "../../api/purchase-ticket";
import AuthContext from "../../components/auth-context";
import AppLink from "../../components/router/app-link";
import Ticket from "../../types/ticket";

export interface IShoppingCardWarningProps {}

export default function ShoppingCardWarning(props: IShoppingCardWarningProps) {
  const context = useContext(AuthContext);
  const [ticket, setTicket] = useState<Ticket | null>(
    context.tickets.length > 0 ? context.tickets[0] : null
  );

  if (!ticket) return null;

  const handleCancle = () => {
    const purchaseTicketApi = new PurchaseTicketApi(context);
    purchaseTicketApi.delete(ticket!.id).then(() => {
      purchaseTicketApi
        .getAll()
        .then((data) => {
          context.setTickets(data);
          setTicket(data.length > 0 ? data[0] : null);
        })
        .catch(() => {});
    });
  };
  return (
    <Row>
      <Col>
        <Card className="mb-3">
          <div className="p-3">
            <p className=" alert bgc-secondary-l4 brc-orange-m1 border-0 border-l-4 radius-0 text-dark-tp2">
              <FontAwesomeIcon
                icon="exclamation-triangle"
                className="text-orange"
              />{" "}
              در حال حاضر یک پیش‌فاکتور صادر شده دارید، قبل از خرید مجدد میبایست
              وضعیت پیش فاکتور قبلی را تعیین تکلیف نمایید.
            </p>
            <h4 className="text-primary">
              <FontAwesomeIcon icon="shopping-basket" /> {ticket.type}
            </h4>

            {ticket.titles.map((title) => (
              <p className="pt-2">
                <strong>{title}</strong>
              </p>
            ))}
          </div>
          <Card.Footer className="bgc-white">
            <Button as={AppLink} variant="success" to={`/payment/${ticket.id}`}>
              پرداخت
            </Button>{" "}
            <Button variant="danger" onClick={handleCancle}>
              لغو خرید
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}
