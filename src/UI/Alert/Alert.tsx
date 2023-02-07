import { ReactNode, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Btn } from "../Btn/Btn";

import "./alert.scss";
interface AlertProps {
  type: "error" | "alert" | "success";
  message?: string;
  children?: ReactNode;
  handleValue: Function;
  value: boolean;
}
export const Alert = ({
  type,
  message,
  children,
  handleValue,
  value,
}: AlertProps) => {
  const [vei, setVie] = useState(false);
  const handleClick = () => {
    setVie(!value);
    setTimeout(() => {
      handleValue(false);
    }, 300);
  };
  useEffect(() => {
    setVie(value);
  }, [value]);
  return (
    <CSSTransition
      timeout={200}
      classNames={"app-alert-anime"}
      in={vei}
      unmountOnExit
    >
      <section className={`app__alert-container-${type} app__alert-container`}>
        {type === "error" && (
          <h2 className="app-alert-container__h2 h2-error">Ошибка</h2>
        )}
        {type === "alert" && (
          <h2 className="app-alert-container__h2 h2-alert">Уведомление</h2>
        )}
        {type === "success" && (
          <h2 className="app-alert-container__h2 h2-success">Успешно</h2>
        )}
        <p>{message}</p>
        {children}

        <Btn waveColor="light" text="Закрыть" handleClick={handleClick} />
      </section>
    </CSSTransition>
  );
};
