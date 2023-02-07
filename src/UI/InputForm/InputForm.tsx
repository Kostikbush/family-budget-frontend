import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import "./inputForm.scss";
interface InputProps {
  placeholder: string;
  type: string;
  setState?: Function;
  value?: string;
  colorWrapper: string;
  colorInput: string;
}
export const InputForm = ({
  type,
  placeholder,
  setState,
  value,
  colorWrapper,
  colorInput,
}: InputProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  return (
    <div className={`input-wrapper ${colorWrapper}`}>
      {type === "text" && (
        <>
          {setState ? (
            <input
              className={`input-wrapper__input ${colorInput}`}
              placeholder={placeholder}
              defaultValue={value}
              onChange={(e) => setState(e.target.value)}
              type={type}
            />
          ) : (
            <input
              className={`input-wrapper__input ${colorInput}`}
              placeholder={placeholder}
              defaultValue={value}
              type={type}
            />
          )}
        </>
      )}
      {type === "password" && (
        <>
          {setState ? (
            <input
              className={`input-wrapper__input ${colorInput}`}
              placeholder={placeholder}
              defaultValue={value}
              onChange={(e) => setState(e.target.value)}
              type={isVisiblePassword ? "text" : type}
            />
          ) : (
            <input
              className={`input-wrapper__input ${colorInput}`}
              placeholder={placeholder}
              defaultValue={value}
              type={isVisiblePassword ? "text" : type}
            />
          )}

          <button
            onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            className="input-wrapper__btn"
          >
            {isVisiblePassword && <AiFillEyeInvisible size={17} />}
            {!isVisiblePassword && <AiFillEye size={17} />}
          </button>
        </>
      )}

      <span className="input-wrapper-btn__stroke"></span>
    </div>
  );
};
