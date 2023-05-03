import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMoneyText } from "../../functions";

export interface ProductProps {
  title: string;
  mainPrice?: number;
  finalPrice: number;
  packageTitle?: string;
  desc: string;
  onSelect?: () => void;
}

function Product({
  title,
  mainPrice,
  finalPrice,
  packageTitle,
  desc,
  onSelect,
}: ProductProps) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3 px-1 mb-3">
      <div className="dh-zoom-1">
        <div className="d-style active btn btn-light btn-h-outline-blue btn-a-outline-blue bgc-white mt-lg-n2 w-100 border-t-3 pb-3 shadow-sm">
          <div className="d-flex flex-column align-items-center">
            <h4 className="w-90 text-150 mt-25 mb-0">
              <i>{title}</i>
            </h4>
            {packageTitle && (
              <span className="position-tr mt-n25 mr-2px">
                <span className="badge badge-lg bgc-orange-d2 brc-orange-d2 text-white arrowed-in arrowed-in-right">
                  {packageTitle}
                </span>
              </span>
            )}

            <hr className="w-90 my-2 brc-secondary-l3" />
            <div className="flex-grow-1 text-dark-l1 text-90 w-90">
              <ul className="list-unstyled text-left mx-auto mb-0">
                {desc && desc !== title && (
                  <li className="">
                    <FontAwesomeIcon
                      icon="check"
                      className="text-success-m2 text-110 mt-1"
                      style={{ marginRight: "-15px" }}
                    />
                    <span>
                      <span className="text-110 text-1">{desc}</span>
                    </span>
                    <hr className="my-2 brc-secondary-l3" />
                  </li>
                )}
                <li className="text-center">
                  <button
                    className="btn btn-blue px-4 text-100 btn-raised"
                    onClick={onSelect && (() => onSelect())}
                  >
                    {mainPrice && mainPrice > finalPrice && (
                      <s className="">
                        <span className="text-100">
                          {getMoneyText(mainPrice).amount}
                        </span>
                        <span>{getMoneyText(mainPrice).postFix}</span>
                      </s>
                    )}{" "}
                    <span className="text-150">
                      {getMoneyText(finalPrice).amount}
                    </span>
                    <br className="d-none d-lg-block" />
                    <span> {getMoneyText(finalPrice).postFix}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
