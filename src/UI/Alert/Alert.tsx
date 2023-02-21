import { ReactNode, useEffect, useMemo, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Btn } from "../Btn/Btn";

import "./alert.scss";

interface errorFromBack {
  data: {
    errors?: [];
    message: string;
  };
  status?: number;
}
interface AlertProps {
  type: "error" | "alert" | "success";
  message?: string;
  children?: ReactNode;
  handleValue?: Function;
  value?: boolean;
  errorsFromBack?: errorFromBack[] | any[] | undefined[] | undefined;
  alert?: {};
}
export const Alert = ({
  type,
  message,
  children,
  handleValue,
  value,
  errorsFromBack,
  alert,
}: AlertProps) => {
  const [vei, setVie] = useState(false);
  const page = document.querySelector(".page-bg-move");

  const handleClick = () => {
    setVie(false);
    setTimeout(() => {
      if (handleValue) {
        handleValue(false);
      }
      page && page.classList.remove("page-blur");
    }, 300);
  };
  useEffect(() => {
    setVie(true);
    if (
      (errorsFromBack && errorsFromBack[0] !== undefined) ||
      alert !== undefined
    ) {
      page && page.classList.add("page-blur");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useMemo(() => {
    if ((value === undefined || value === null) && !handleValue) {
      setTimeout(() => {
        setVie(false);
      }, 5000);
    }
  }, [value, handleValue]);
  setTimeout(() => {
    if ((value === undefined || value === null) && !handleValue) {
      page && page.classList.remove("page-blur");
    }
  }, 5000);
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
        {errorsFromBack?.map((error) => (
          <p>{error !== undefined && error.data.message}</p>
        ))}
        {children}
        {handleValue && (
          <Btn waveColor="light" text="Закрыть" handleClick={handleClick} />
        )}
      </section>
    </CSSTransition>
  );
};
