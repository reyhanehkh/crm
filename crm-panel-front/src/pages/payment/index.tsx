import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PaymentApi from "../../api/payment";
import AuthContext from "../../components/auth-context";
import useAppNavigate from "../../components/router/use-app-navigate";
import { getMoneyText } from "../../functions";
import PaymentData from "../../types/PaymentData";
import ShoppingIcon from "./shopping-icon";

function Payment() {
  // const context = useContext(AuthContext);
  // const dataProvider = (page: number, pageSize: number) =>
  //   new PaymentApi(context).getAll(page, pageSize);
  const { t } = useTranslation();
  const context = useContext(AuthContext);
  let { receiptId } = useParams();
  const [discountCode, setDiscountCode] = useState("");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isCreditPayable, setIsCreditPayable] = useState(false);
  const [isDepositPayable, setIsDepositPayable] = useState(false);
  const discountCodeInput = useRef<HTMLInputElement | null>(null);
  let navigate = useAppNavigate();
  let epaymentAmount = 0;
  if (paymentData) {
    epaymentAmount = paymentData.payableAmount;
    if (isCreditPayable)
      epaymentAmount -= paymentData.profileInfo.creditPayable;
    if (isDepositPayable)
      epaymentAmount -= paymentData.profileInfo.depositPayable;
  }

  useEffect(() => {
    if (receiptId) {
      const paymentApi = new PaymentApi(context);
      paymentApi.get(receiptId, discountCode).then((data) => {
        if (data.errorMessage) {
          setDiscountCode("");
          discountCodeInput.current!.value = "";
          console.error(data.errorMessage);
        } else setPaymentData(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptId, discountCode]);
  const getToman = (value: number) => {
    let money = getMoneyText(value);
    return `${money.amount} ${money.postFix}`;
  };

  const onsubmit = () => {
    const paymentApi = new PaymentApi(context);
    paymentApi
      .put(receiptId!, discountCode, isDepositPayable, isCreditPayable)
      .then((error) => {
        if (error) console.log("onsubmit", error, epaymentAmount);
        else if (epaymentAmount)
          navigate(
            `//accounts.sepanta.com/payment/electronicpurchase/${receiptId}`
          );
        else navigate("/");
      });
  };
  return paymentData ? (
    <>
      <div
        className="card dcard"
        style={{ padding: "5px", marginBottom: "20px" }}
      >
        <table
          id="simple-table "
          className="payment-tb mb-0 table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden"
        >
          <thead className="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
            <tr
              style={{
                backgroundColor: "#6f89a3",
                color: "#fff",
                fontSize: "18px",
              }}
            >
              {/* <th className="text-center pr-0">
                <label className="py-0">
                  <input
                    type="checkbox"
                    className="align-bottom mb-n1 border-2 text-dark-m3"
                  />
                </label>
              </th> */}

              <th>
                <FontAwesomeIcon
                  icon="cart-arrow-down"
                  className="cart-arrow-down"
                />{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Filled"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  style={{ color: "#fff", marginLeft: "7px" }}
                >
                  <path
                    d="M22.713,4.077A2.993,2.993,0,0,0,20.41,3H4.242L4.2,2.649A3,3,0,0,0,1.222,0H1A1,1,0,0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,3,0,0,1-2.82-2h11.92a5,5,0,0,0,4.921-4.113l.785-4.354A2.994,2.994,0,0,0,22.713,4.077Z"
                    fill="#fff"
                  />
                  <circle cx="7" cy="22" r="2" fill="#fff" />
                  <circle cx="17" cy="22" r="2" fill="#fff" />
                </svg>
                {t("Payment.Title")}
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody className="mt-1">
            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {t("Payment.For")}
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {paymentData!.topic}
              </td>
            </tr>
            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {t("Payment.Price")}
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {getToman(
                  paymentData!.amountValue +
                    paymentData!.discount -
                    paymentData!.taxAmount
                )}
              </td>
            </tr>
            {paymentData!.discount > 0 && (
              <tr className="bgc-h-yellow-l4 d-style">
                <td className="text-right pr-25 pos-rel payment-title-td">
                  <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                  <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                  {t("Payment.Discount")}
                </td>
                <td className="text-right pr-25 pos-rel">
                  <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                  <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                  {getToman(paymentData!.discount || 0)}
                  {paymentData.discountCode &&
                    ` (${t("Payment.DiscountCode")}: ${
                      paymentData.discountCode
                    })`}
                </td>
              </tr>
            )}
            {/* 
            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                مبلغ بدون مالیات
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                26,410,000 ریال
              </td>
            </tr> */}
            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {t("Payment.Tax")}
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {getToman(paymentData!.taxAmount)}
              </td>
            </tr>
            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {t("Payment.FinalPrice")}
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                {getToman(paymentData!.payableAmount)}
              </td>
            </tr>
            {/* <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                توضیحات خرید
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                خط 9412304574 - پیش خرید تخفیف 5%
              </td>
            </tr> */}
            {/* <tr className="border-0 detail-row bgc-white">
              <td aria-colspan={8} className="p-0 border-none brc-secondary-l2">
                <div className="table-detail collapse" id="table-detail-0">
                  <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 p-4">
                      <div className="alert bgc-secondary-l4 text-dark-m2 border-none border-l-4 brc-primary-m1 radius-0 mb-0">
                        <h4 className="text-primary">Row Details</h4>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque commodo massa sed ipsum porttitor facilisis.
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* <div
        className="card dcard"
        style={{ padding: "5px", marginBottom: "20px" }}
      >
        <table
          id="simple-table "
          className="payment-tb mb-0 table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden"
        >
          <thead className="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
            <tr
              style={{
                backgroundColor: "#6f89a3",
                color: "#fff",
                fontSize: "18px",
              }}
            >
              {/* <th className="text-center pr-0">
                <label className="py-0">
                  <input
                    type="checkbox"
                    className="align-bottom mb-n1 border-2 text-dark-m3"
                  />
                </label>
              </th> */}

      {/* <th>
                <FontAwesomeIcon
                  icon="cart-arrow-down"
                  className="cart-arrow-down"
                />{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Filled"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  style={{ color: "#fff", marginLeft: "7px" }}
                >
                  <path
                    d="M19,3H5A5.006,5.006,0,0,0,0,8H24A5.006,5.006,0,0,0,19,3Z"
                    fill="#fff"
                  />
                  <path
                    d="M0,16a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm7-.5A1.5,1.5,0,1,1,5.5,14,1.5,1.5,0,0,1,7,15.5"
                    fill="#fff"
                  />
                </svg>
                وضعیت مالی اشتراک
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody className="mt-1">
            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td min-width-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                موجودی
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                8,000 ریال
              </td>
            </tr>

            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                اعتبار
              </td>
              <td className="text-right pr-25 pos-rel">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                3,001,260 ریال
              </td>
            </tr>

            {/* <tr className="border-0 detail-row bgc-white">
              <td aria-colspan={8} className="p-0 border-none brc-secondary-l2">
                <div className="table-detail collapse" id="table-detail-0">
                  <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 p-4">
                      <div className="alert bgc-secondary-l4 text-dark-m2 border-none border-l-4 brc-primary-m1 radius-0 mb-0">
                        <h4 className="text-primary">Row Details</h4>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque commodo massa sed ipsum porttitor facilisis.
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr> */}
      {/* </tbody>
        </table>
      </div> */}

      <div className="card dcard" style={{ padding: "5px" }}>
        <table
          id="simple-table "
          aria-colspan={2}
          className="payment-tb payment3-tb mb-0 table table-borderless table-bordered-x brc-secondary-l3 text-dark-m2 radius-1 overflow-hidden"
        >
          <thead className="text-dark-tp3 bgc-grey-l4 text-90 border-b-1 brc-transparent">
            <tr
              style={{
                backgroundColor: "#6f89a3",
                color: "#fff",
                fontSize: "18px",
              }}
            >
              {/* <th className="text-center pr-0">
                <label className="py-0">
                  <input
                    type="checkbox"
                    className="align-bottom mb-n1 border-2 text-dark-m3"
                  />
                </label>
              </th> */}

              <th>
                <FontAwesomeIcon
                  icon="cart-arrow-down"
                  className="cart-arrow-down"
                />{" "}
                <ShoppingIcon />
                {t("Payment.Pay")}
              </th>

              <th></th>
            </tr>
          </thead>

          <tbody className="mt-1">
            {/* <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel payment-title-td ">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                شیوه پرداخت را انتخاب نمایید. جهت پرداخت الکترونیک می توانید
                دروازه ی پرداخت (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Filled"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#7aceef"
                    d="M12,24A12,12,0,1,0,0,12,12.013,12.013,0,0,0,12,24ZM12,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12,5Zm-1,5h1a2,2,0,0,1,2,2v6a1,1,0,0,1-2,0V12H11a1,1,0,0,1,0-2Z"
                  />
                </svg>
                ) خاصی را انتخاب نمایید
              </td>
              <td></td>
            </tr> */}

            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel ">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                <p>
                  در مجموع مبلغ{" "}
                  <strong>{getToman(paymentData!.payableAmount)}</strong> پرداخت
                  نمایید
                </p>
                <form className="form-inline">
                  <div className="form-group mb-2">
                    {t("Payment.DiscountCode")} :
                    <div className="input-group mx-sm-1">
                      <input
                        ref={discountCodeInput}
                        type="text"
                        className="form-control"
                        placeholder={t("Payment.DiscountCode")}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            console.log(discountCodeInput.current!.value);
                            setDiscountCode(discountCodeInput.current!.value);
                          }}
                        >
                          {t("Payment.DiscountCodeSubmit")}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <form className="" style={{ marginTop: "15px" }}>
                  <div className="form-group  mb-2">
                    {paymentData!.profileInfo.depositPayable > 0 && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isDepositPayable}
                          onChange={() =>
                            setIsDepositPayable(!isDepositPayable)
                          }
                          id="defaultCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          پرداخت{" "}
                          <strong>
                            {getToman(paymentData!.profileInfo.depositPayable)}
                          </strong>{" "}
                          از موجودی اشتراک
                        </label>
                      </div>
                    )}
                    {paymentData.profileInfo.creditPayable > 0 && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={isCreditPayable}
                          id="defaultCheck2"
                          onChange={() => setIsCreditPayable(!isCreditPayable)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck2"
                        >
                          پرداخت{" "}
                          <strong>
                            {getToman(paymentData.profileInfo.creditPayable)}
                          </strong>{" "}
                          از موجودی اعتبار
                        </label>
                      </div>
                    )}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck3"
                        disabled
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck3"
                      >
                        پرداخت <strong>{getToman(epaymentAmount)}</strong> بصورت
                        الکترونیکی
                      </label>
                    </div>
                  </div>
                </form>
              </td>
              <td></td>
            </tr>

            <tr className="bgc-h-yellow-l4 d-style">
              <td className="text-right pr-25 pos-rel ">
                <div className="position-tl h-100 ml-n1px border-l-4 brc-orange-m1 v-hover"></div>
                <div className="position-tl h-100 ml-n1px border-l-4 brc-success-m1 v-active"></div>
                <div
                  className="form-group col-md-5 col-12"
                  style={{ marginRight: "-15px" }}
                >
                  {/* <select id="inputState" className="form-control">
                    <option selected>دروازه پرداخت بانک پارسیان</option>
                    <option>...</option>
                  </select> */}
                  <button
                    className="btn btn-primary mt-2"
                    style={{ width: "inherit" }}
                    onClick={() => onsubmit()}
                  >
                    {t("Payment.Pay")}
                  </button>
                  <br />
                  <a href="https://accounts.sepanta.com/Files/police.docx">
                    <span
                      style={{
                        fontSize: "12.5px",
                        display: "block",
                        marginTop: "7px",
                        paddingRight: "5px",
                      }}
                    >
                      {t("Payment.Warning")}
                    </span>
                  </a>
                </div>
              </td>
              <td></td>
            </tr>

            {/* <tr className="border-0 detail-row bgc-white">
              <td aria-colspan={8} className="p-0 border-none brc-secondary-l2">
                <div className="table-detail collapse" id="table-detail-0">
                  <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 p-4">
                      <div className="alert bgc-secondary-l4 text-dark-m2 border-none border-l-4 brc-primary-m1 radius-0 mb-0">
                        <h4 className="text-primary">Row Details</h4>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque commodo massa sed ipsum porttitor facilisis.
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Payment;
