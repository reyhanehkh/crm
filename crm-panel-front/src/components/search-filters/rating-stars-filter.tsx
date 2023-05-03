import RatingStars from "./rating-stars";
import TopicBox from "./topic-box";

function RatingStarsFilter() {
  return (
    <TopicBox title="Rating">
      <RatingStars count={4} />
      <RatingStars count={3} />
      <RatingStars count={2} />
      <RatingStars count={1} />
    </TopicBox>
  );
}
export default RatingStarsFilter;
