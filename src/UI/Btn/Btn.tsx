import React, { ReactNode, useState } from "react";
import "./btn.scss";

interface btnProps {
  text: string;
  handleClick: Function;
  children?: ReactNode;
  waveColor?: "light" | "dark";
  isReqvest?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  testId?: string;
  border?:
    | "border-red"
    | "border-blue"
    | "border-pinc"
    | "border-yellow"
    | "border-green"
    | "border-violet";
  style?: object;
}
export const Btn = ({
  text,
  handleClick,
  children,
  waveColor = "dark",
  isReqvest = false,
  type,
  testId = "",
  border = "border-pinc",
  style,
}: btnProps) => {
  const [vieWave, setVieWave] = useState(false);
  const [dataStyle, setDataVue] = useState({});
  const handleBtnClick = (event: React.MouseEvent) => {
    let size = 135;
    let x = event.nativeEvent.offsetX - size / 2;
    let y = event.nativeEvent.offsetY - size / 2;
    setDataVue({
      width: `${size}px`,
      height: `${size}px`,
      top: `${y}px`,
      left: `${x}px`,
    });
    setVieWave(true);
    handleClick();
    setTimeout(() => {
      setVieWave(false);
      setDataVue({});
    }, 300);
  };
  return (
    <>
      {!isReqvest ? (
        <button
          style={style}
          data-testid={testId}
          type={type}
          onClick={handleBtnClick}
          className={`btn ${border}`}
        >
          {text}
          <span className="btn__stroke"></span>
          {vieWave && (
            <span
              style={dataStyle}
              className={`pulse pulse-${waveColor}`}
            ></span>
          )}
          {children}
        </button>
      ) : (
        <button style={style} className={`btn ${border}`}>
          {text}
          {children}
          {vieWave && (
            <span
              style={dataStyle}
              className={`pulse pulse-${waveColor}`}
            ></span>
          )}
        </button>
      )}
    </>
  );
};
