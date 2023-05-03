export interface SwitchBoxProps {
  title: string;
  isActive?: boolean;
}
function SwitchBox({ title, isActive = false }: SwitchBoxProps) {
  console.log("SwitchBox", title, isActive);
  return (
    <div className="d-flex align-items-center mt-2">
      <label className="text-95" htmlFor="id-switch-1">
        {title}
      </label>
      <input
        type="checkbox"
        className="ace-switch ml-auto radius-1px input-sm"
        id="id-switch-1"
        defaultChecked={isActive}
      />
    </div>
  );
}
export default SwitchBox;
