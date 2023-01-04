import { MouseEventHandler, ReactNode } from "react";
import "./btn.scss";

interface btnProps {
  text: string;
  handleClick: MouseEventHandler;
  children?: ReactNode;
}

export const Btn = ({ text, handleClick, children }: btnProps) => {
  return (
    <button onClick={handleClick} className="btn">
      {text}
      <span className="btn__stroke"></span>
      {children}
    </button>
  );
};
