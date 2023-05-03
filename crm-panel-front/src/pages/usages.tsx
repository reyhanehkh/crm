import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Moment } from "moment-jalaali";
import { useContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DayTotalUsageApi from "../api/day-total-usage";
import AuthContext from "../components/auth-context";
import DatePicker from "../components/inputs/date-picker";
import SGrid from "../components/sgrid";
import { IGridFilterRule } from "../types/grid-filters";

function Usages() {
  const context = useContext(AuthContext);
  const { activeFileId } = context;
  const [fromDate, setFromDate] = useState<Moment | undefined>();
  const [toDate, setToDate] = useState<Moment | undefined>();
  const { t } = useTranslation();
  let rules: IGridFilterRule[] = [];
  if (fromDate)
    rules.push({
      field: "DayDate",
      op: "ge",
      data: fromDate.format("jYYYY/jMM/jDD"),
    });
  if (toDate)
    rules.push({
      field: "DayDate",
      op: "le",
      data: toDate.format("jYYYY/jMM/jDD"),
    });
  const dataProvider = (page: number, pageSize: number) =>
    new DayTotalUsageApi(context)
      .getAll(activeFileId!, {
        page,
        rows: pageSize,
        filters: {
          groupOp: "AND",
          rules,
        },
      })
      .then(({ records, rows, userdata }) => {
        rows = rows.map(({ id, cell }: { id: number; cell: any[] }) => ({
          id,
          cell: [...cell, cell[1]! + cell[3]!],
        }));
        let sumCell = [...userdata, userdata[1]! + userdata[3]!];
        sumCell[0] = "مجموع";
        rows.push({ id: 0, cell: sumCell });
        return {
          records,
          rows: rows,
        };
      });

  return (
    <>
      <Row className="my-3">
        <Col>
          <ul className="list-unstyled">
            <li>
              <FontAwesomeIcon
                icon="exclamation-triangle"
                className="w-3 text-orange mr-2"
              />
              {t("Usages.WarningText")}
            </li>
          </ul>
        </Col>
      </Row>
      <Card>
        <Card.Header>
          <h6 className="card-title">فیلتر تاریخ</h6>
        </Card.Header>
        <Card.Body>
          <DatePicker label="از" value={fromDate} onChange={setFromDate} />
          <DatePicker label="تا" value={toDate} onChange={setToDate} />
        </Card.Body>
      </Card>
      <Card className="dcard mt-3" style={{ padding: "5px" }}>
        <SGrid
          key={JSON.stringify([fromDate, toDate])}
          dataProvider={dataProvider}
          columns={[
            ["تاریخ", "date"],
            ["بین‌الملل", "farsi"],
            "",
            ["داخلی", "farsi"],
            "",
            "",
            ["مجموع", "farsi"],
          ]}
        />
      </Card>
    </>
  );
}

export default Usages;
