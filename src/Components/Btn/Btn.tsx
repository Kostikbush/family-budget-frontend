import React, { ReactNode, useState } from "react";
import "./btn.scss";

interface btnProps {
  text: string;
  handleClick: Function;
  children?: ReactNode;
}

export const Btn = ({ text, handleClick, children }: btnProps) => {
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
    setTimeout(() => {
      setVieWave(false);
      setDataVue({});
    }, 500);
    handleClick(event);
  };
  return (
    <button onClick={handleBtnClick} className="btn">
      {text}
      <span className="btn__stroke"></span>
      {vieWave && <span style={dataStyle} className="pulse"></span>}
      {children}
    </button>
  );
};
