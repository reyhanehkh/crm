export interface RatingStarsProps {
  count: number;
}
function RatingStars({ count }: RatingStarsProps) {
  return (
    <div className="text-95 text-warning-m2">
      <i className={`${count > 0 ? "fa" : "far"} fa-star`} />
      <i className={`${count > 1 ? "fa" : "far"} fa-star`} />
      <i className={`${count > 2 ? "fa" : "far"} fa-star`} />
      <i className={`${count > 3 ? "fa" : "far"} fa-star`} />
      <i className={`${count > 4 ? "fa" : "far"} fa-star`} />
      <span className="text-dark-m3 text-90">&amp; Up</span>
    </div>
  );
}

export default RatingStars;
