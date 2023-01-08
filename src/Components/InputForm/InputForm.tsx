import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
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
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  return (
    <div className="input-wrapper">
      {type === "text" && (
        <>
          <input
            className="input-wrapper__input-from"
            placeholder={placeholder}
            defaultValue={value}
            onChange={(e) => setState(e.target.value)}
            type={type}
          />
        </>
      )}
      {type === "password" && (
        <>
          <input
            className="input-wrapper__input-from"
            placeholder={placeholder}
            defaultValue={value}
            onChange={(e) => setState(e.target.value)}
            type={isVisiblePassword ? "text" : type}
          />
          <button
            onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            className="input-wrapper__icon"
          >
            {isVisiblePassword && <AiFillEyeInvisible size={17} />}
            {!isVisiblePassword && <AiFillEye size={17} />}
          </button>
        </>
      )}

      <span className="input-wrapper__btn__stroke"></span>
    </div>
  );
};
