/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useMemo, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ErrorBackWork, IErrorBackend } from "../../models/IErrorBackend";
import { Btn } from "../Btn/Btn";

import "./alert.scss";
import { changeStyle } from "./helpersFunc/helpersfunc";

interface AlertProps {
  type: "error" | "alert" | "success" | "choose";
  message?: string;
  children?: ReactNode;
  handleBooleanValue?: Function;
  errorsFromBack?: IErrorBackend | undefined;
  errorsValidtionForm?: string[];
  setRessetArray?: Function;
  isError?: boolean;
  errorWorkBack?: ErrorBackWork | undefined;
  vieAlert?: boolean;
  chooseYes?: Function;
}

export const Alert = ({
  type,
  message,
  children,
  handleBooleanValue,
  errorsFromBack,
  errorsValidtionForm,
  setRessetArray,
  errorWorkBack,
  vieAlert,
  isError,
  chooseYes,
}: AlertProps) => {
  const [vei, setVie] = useState(false);
  const page = document.querySelectorAll(".page-bg-move");

  const changeOnEnter = () => {
    setVie(true);
    page && changeStyle(page, "add");
  };
  useMemo(() => {
    if (errorsFromBack || isError || errorWorkBack) {
      changeOnEnter();
    } else if (errorsValidtionForm && errorsValidtionForm.length > 0) {
      changeOnEnter();
    } else if (vieAlert) {
      changeOnEnter();
    }
  }, [errorsFromBack, isError, errorWorkBack, errorsValidtionForm, vieAlert]);
  const handleClickClose = () => {
    handleBooleanValue && handleBooleanValue(false);
    setRessetArray && setRessetArray([]);

    page && changeStyle(page, "remove");
    setVie(false);
  };
  const handleChooseYes = () => {
    chooseYes && chooseYes();
  };
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
        {(type === "choose" || type === "alert") && (
          <h2 className="app-alert-container__h2 h2-alert">Уведомление</h2>
        )}
        {type === "success" && (
          <h2 className="app-alert-container__h2 h2-success">Успешно</h2>
        )}

        <p>{message ? message : ""}</p>
        <p>{errorsFromBack && errorsFromBack.data.message}</p>

        {errorsFromBack &&
          errorsFromBack.data &&
          errorsFromBack.data.errors &&
          errorsFromBack.data.errors.length > 0 && (
            <ul className="errors-list-alert">
              {errorsFromBack.data.errors.map((error, index: number) => (
                <li key={index}>{error.value}</li>
              ))}
            </ul>
          )}

        {errorsValidtionForm && errorsValidtionForm.length > 0 && (
          <ul className="errors-list-alert">
            {errorsValidtionForm.map((error, index: number) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {errorWorkBack && (
          <span className="errorWorkBack-text">{errorWorkBack.error}</span>
        )}
        {children}
        {!errorWorkBack && type !== "choose" && (
          <Btn
            testId="btn-alert"
            waveColor="light"
            text="Закрыть"
            handleClick={handleClickClose}
          />
        )}
        {type === "choose" && (
          <div className="choose-btn">
            <Btn
              handleClick={handleChooseYes}
              text="Да"
              type="button"
              waveColor="light"
            />
            <Btn
              handleClick={handleClickClose}
              text="Нет"
              type="button"
              waveColor="light"
            />
          </div>
        )}
      </section>
    </CSSTransition>
  );
};
