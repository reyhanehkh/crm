import Slider from "./slider";
import TopicBox from "./topic-box";

export interface SliderFilterProps {
  title: string;
  range: number[];
  selectedRange?: number[];
  onChange?: (range: number[]) => void;
}

function SliderFilter({
  title,
  range,
  selectedRange,
  onChange,
}: SliderFilterProps) {
  let activeRange = selectedRange || range;
  return (
    <TopicBox title={title}>
      <Slider
        range={range}
        selectedRange={activeRange}
        onUpdate={(data: number[]) => {
          (data[0] !== activeRange[0] || data[1] !== activeRange[1]) &&
            onChange &&
            onChange(data);
        }}
      />
    </TopicBox>
  );
}

export default SliderFilter;
