interface RadiobuttonProps {
  title: string;
  count?: number;
  onChange?: (value: string) => void;
  isChecked?: boolean;
  value: string;
}
function Radiobutton({
  title,
  count,
  onChange,
  isChecked,
  value,
}: RadiobuttonProps) {
  return (
    <div className="d-flex align-items-center py-2">
      <label className="text-95 mb-0">
        <input
          type="radio"
          className="mr-2 bgc-blue brc-h-blue-m1"
          value={value}
          onChange={(event) => onChange && onChange(event.target.value)}
          checked={isChecked || false}
        />
        {title}
      </label>
      {count && (
        <span className="badge badge-pill bgc-blue-l3 text-blue-d2 ml-auto">
          {count}
        </span>
      )}
    </div>
  );
}

export default Radiobutton;
