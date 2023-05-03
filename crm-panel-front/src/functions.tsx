import moment from "moment-jalaali";

export function localizeNumbers(value: string): string {
  return (
    value &&
    value
      .toString()
      .replace(/0|۰/g, "۰")
      .replace(/1|۱/g, "۱")
      .replace(/2|۲/g, "۲")
      .replace(/3|۳/g, "۳")
      .replace(/4|٤/g, "۴")
      .replace(/5|٥/g, "۵")
      .replace(/6|٦/g, "۶")
      .replace(/7|۷/g, "۷")
      .replace(/8|۸/g, "۸")
      .replace(/9|۹/g, "۹")
  );
}
export function unLocalizeNumbers(value: string): string {
  return (
    value &&
    value
      .toString()
      .replace(/۰|۰/g, "0")
      .replace(/۱|۱/g, "1")
      .replace(/۲|۲/g, "2")
      .replace(/۳|۳/g, "3")
      .replace(/۴|٤/g, "4")
      .replace(/۵|٥/g, "5")
      .replace(/۶|٦/g, "6")
      .replace(/۷|۷/g, "7")
      .replace(/۸|۸/g, "8")
      .replace(/۹|۹/g, "9")
  );
}

export function getMoneyText(price: number): {
  amount: string;
  postFix: string;
} {
  let postFix = "تومان";
  price = price / 10;

  return {
    amount: localizeNumbers(new Intl.NumberFormat().format(price)),
    postFix: postFix,
  };
}

export interface DateReminds {
  days: number;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

export function GetDateDiff(date1: Date, date2: Date): DateReminds {
  var diff = date2.getTime() - date1.getTime();
  var isExpired = diff <= 0;
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  var hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  var mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);

  var seconds = Math.floor(diff / 1000);
  var result = {
    days: days,
    hours: addZero(hours),
    minutes: addZero(mins),
    seconds: addZero(seconds),
    isExpired: isExpired,
  };
  return result;
}

function addZero(x: number): string {
  let result = String(x);
  if (result.length === 1) result = "0" + result;
  return result;
}

export function getCopyOf(x: any) {
  return JSON.parse(JSON.stringify(x));
}

export function convertDate(date?: Date) {
  return date && localizeNumbers(moment(date).format("jYYYY/jMM/jDD"));
}
