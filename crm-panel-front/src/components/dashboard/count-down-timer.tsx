import { Moment } from "moment-jalaali";
import { useState } from "react";
import { DateReminds, GetDateDiff } from "../../functions";

export interface CountDownTimerProps {
  expireDate: Moment;
  onExpire: () => void;
}

function CountDownTimer({ expireDate, onExpire }: CountDownTimerProps) {
  const getState = () => {
    var remindDate = GetDateDiff(new Date(), expireDate.toDate());
    remindDate.isExpired && onExpire();
    return remindDate;
  };
  let [remind, setRemind] = useState<DateReminds>(getState());
  if (!remind.isExpired)
    var timer = setInterval(() => {
      const state = getState();
      setRemind(state);
      if (state.isExpired) {
        clearInterval(timer);
      }
    }, 1000);
  return (
    <>
      {remind.hours}:{remind.minutes}:{remind.seconds}
      {remind.days > 0 ? " و " + remind.days + " روز " : " "}
    </>
  );
}

export default CountDownTimer;
