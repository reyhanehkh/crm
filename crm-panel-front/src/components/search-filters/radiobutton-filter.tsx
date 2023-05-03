import { useState } from "react";
import Radiobutton from "./radiobutton";
import ShowMoreButton from "./show-more-button";
import TopicBox from "./topic-box";
export interface RadiobuttonFilterProps {
  title: string;
  topics: { [id: string]: string };
  selectedValues?: string[];
  onChange?: (selectedValues: string[]) => void;
}

function RadiobuttonFilter({
  title,
  topics,
  selectedValues,
  onChange,
}: RadiobuttonFilterProps) {
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
  const activeValue = selectedValues ? selectedValues[0] : mainItems[0].topicId;
  console.log("RadiobuttonFilter.selectedValues", selectedValues);
  function renderRadiobuttons(items: { topicId: string; title: string }[]) {
    return items.map((item) => (
      <Radiobutton
        key={item.topicId}
        title={item.title}
        isChecked={activeValue === item.topicId}
        value={item.topicId}
        onChange={(value) => {
          onChange && onChange([value]);
        }}
      />
    ));
  }

  return (
    <TopicBox title={title}>
      {/* {!noAllValues && <Checkbox title="همه" />} */}
      {renderRadiobuttons(mainItems)}
      <div
        className={"collapse" + (isCollapsed ? "" : " show")}
        id="categories-more"
      >
        {renderRadiobuttons(otherItems)}
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

export default RadiobuttonFilter;
