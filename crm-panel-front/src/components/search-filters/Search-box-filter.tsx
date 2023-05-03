import SearchBox from "./search-box";
import TopicBox from "./topic-box";

function SearchBoxFilter() {
  return (
    <TopicBox title="Keyword">
      <SearchBox />
    </TopicBox>
  );
}

export default SearchBoxFilter;
