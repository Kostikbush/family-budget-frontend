import "./inputForm.scss";
interface InputProps {
  placeholder: string;
  type: string;
  setState: Function;
  value?: string;
}
export const InputForm = ({
  type,
  placeholder,
  setState,
  value,
}: InputProps) => {
  return (
    <div className="input-wrapper">
      <input
        className="input-wrapper__input-from"
        placeholder={placeholder}
        defaultValue={value}
        onChange={(event) => setState(event.target.value)}
        type={type}
      />
      <span className="input-wrapper__btn__stroke"></span>
    </div>
  );
};
