import { useContext } from "react";
import WithdrawApi from "../api/withdraw";
import AuthContext from "../components/auth-context";
import SGrid from "../components/sgrid";

function Withdraws() {
  const context = useContext(AuthContext);
  const dataProvider = (page: number, pageSize: number) =>
    new WithdrawApi(context).getAll(page, pageSize);

  return (
    <>
      <div className="card dcard" style={{ padding: "5px" }}>
        <SGrid
          dataProvider={dataProvider}
          columns={[
            ["تاریخ", "date"],
            ["مبلغ (تومان)", "toman"],
            "",
            "",
            "",
            "توضیحات",
          ]}
        />
      </div>
    </>
  );
}

export default Withdraws;
