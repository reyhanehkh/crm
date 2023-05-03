import moment from "moment-jalaali";
import { getMoneyText, localizeNumbers } from "../../functions";

const PredefinedComponents: { [id: string]: React.FunctionComponent<any> } = {};

PredefinedComponents["date"] = ({ value }) => {
  var date = value.toString().substring(0, 8);
  let m = moment(date, "jYYYYjMMjDD");

  return (
    <>{m.isValid() ? localizeNumbers(m.format("jYYYY/jMM/jDD")) : value}</>
  );
};

PredefinedComponents["farsi"] = ({ value }) => {
  return <>{localizeNumbers(value)}</>;
};

PredefinedComponents["toman"] = ({ value }) => {
  value = getMoneyText(value).amount;
  return <>{value}</>;
};

export default PredefinedComponents;
