import { useEffect } from "react";
import Nouislider from "react-nouislider";

function Slider(props) {
  let { range, selectedRange, onUpdate } = props;
  useEffect(() => {
    document
      .querySelectorAll("#id-price-slider .noUi-handle")
      .forEach((e) => e.classList.add("brc-info-d2", "border-2", "radius-1"));
    document
      .querySelectorAll("#id-price-slider .noUi-base")
      .forEach((e) => e.classList.add("bgc-grey-l1"));

    document
      .querySelectorAll("#id-price-slider .noUi-connect")
      .forEach((e) => e.classList.add("bgc-info-d2"));
    document
      .querySelectorAll("#id-price-slider .noUi-tooltip")
      .forEach((e) =>
        e.classList.add(
          "bgc-dark-tp1",
          "text-white",
          "border-0",
          "text-90",
          "radius-1",
          "px-2"
        )
      );
  });
  return (
    <div className="pt-35">
      <div
        id="id-price-slider"
        className="noUi noUi-toggle-tooltip mb-3 slider-thin"
      >
        <Nouislider
          tooltips
          start={selectedRange || range}
          connect
          range={{
            min: range[0],
            max: range[1],
          }}
          format={{
            from: function (value) {
              return parseInt(value);
            },
            to: function (value) {
              return parseInt(value);
            },
          }}
          onUpdate={(values) => onUpdate && onUpdate([...values])}
        />
      </div>
    </div>
  );
}
export default Slider;
