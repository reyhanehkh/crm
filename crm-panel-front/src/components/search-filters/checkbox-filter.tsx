import { useState } from "react";
import Checkbox from "./checkbox";
import ShowMoreButton from "./show-more-button";
import TopicBox from "./topic-box";
export interface CheckboxFilterProps {
  title: string;
  topics: { [id: string]: string };
  selectedValues?: string[];
  onChange?: (selectedValues: string[]) => void;
}

function CheckboxFilter({
  title,
  topics,
  selectedValues,
  onChange,
}: CheckboxFilterProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  let mainItems = [];
  let otherItems = [];
  let count = 0;
  for (var topicId in topics) {
    if (count < 3) {
      mainItems.push({ topicId, title: topics[topicId] });
    } else {
      otherItems.push({ topicId, title: topics[topicId] });
    }
    count++;
  }
  const activeValues = selectedValues
    ? [...selectedValues]
    : [
        ...mainItems.map((item) => item.topicId),
        ...otherItems.map((item) => item.topicId),
      ];

  function renderCheckboxes(items: { topicId: string; title: string }[]) {
    return items.map((item) => (
      <Checkbox
        key={item.topicId}
        title={item.title}
        isChecked={activeValues?.includes(item.topicId)}
        onChange={(isChecked) => {
          const id = item.topicId;
          console.log("onChange", isChecked, id, activeValues);
          if (isChecked) {
            activeValues.push(id);
            onChange && onChange(activeValues);
          } else {
            activeValues &&
              onChange &&
              onChange(activeValues.filter((val) => val !== id));
          }
        }}
      />
    ));
  }

  return (
    <TopicBox title={title}>
      {/* {!noAllValues && <Checkbox title="همه" />} */}
      {renderCheckboxes(mainItems)}
      <div
        className={"collapse" + (isCollapsed ? "" : " show")}
        id="categories-more"
      >
        {renderCheckboxes(otherItems)}
      </div>
      {otherItems && otherItems.length > 0 && (
        <ShowMoreButton
          isCollapsed={isCollapsed}
          onChange={(isCollapsed) => setIsCollapsed(isCollapsed)}
        />
      )}
    </TopicBox>
  );
}

export default CheckboxFilter;
