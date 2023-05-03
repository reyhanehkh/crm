interface CheckBoxProps {
  title: string;
  count?: number;
  onChange?: (isChecked: boolean) => void;
  isChecked?: boolean;
}
function Checkbox({ title, count, onChange, isChecked }: CheckBoxProps) {
  return (
    <div className="d-flex align-items-center py-2">
      <label className="text-95 mb-0">
        <input
          type="checkbox"
          className="mr-2 bgc-blue brc-h-blue-m1"
          onChange={(event) => onChange && onChange(event.target.checked)}
          defaultChecked={isChecked || false}
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

export default Checkbox;
