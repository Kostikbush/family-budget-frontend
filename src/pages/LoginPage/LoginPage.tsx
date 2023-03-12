import { useEffect, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import { Alert } from "../../UI/Alert/Alert";

import { useAppDispatch } from "../../hooks/redux";
import { dataUserSaveStore } from "../../store/reducers/UserAftorasationSlice";

import "./login.scss";
import { getDataFromIndexDB } from "../../helpersFunc/saved";
import { changeBody } from "../../helpersFunc/changeBody";
import { ChangeBgPages } from "../../CONST/ChangeBgPages";

import { checkOnlineStatus } from "../../helpersFunc/checkOnline";
import { RegistrationForm } from "./RegistrashionForm/RegistrationForm";
import { LoginForm } from "./LoginForm/LoginForm";
import { useCheckBackMutation } from "../../service/authApi";
import { QueryResult } from "../../models/typeQueryResult";
import { ErrorBackWork } from "../../models/IErrorBackend";
import { LoaderPage } from "../../UI/LoaderPage/LoaderPage";
import { WrapperForm } from "../../UI/WrapperForm/WrapperForm";

export const LoginPage = () => {
  const [errorsValidations, setErrorsValidations] = useState<string[]>([]);
  const [errorReg, seteErrorReg] = useState(undefined);
  const [errorLog, seteErrorLog] = useState(undefined);
  const [isVieEnterForm, setIsVieEnterForm] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [checkBack, { error, isLoading, isError }] =
    useCheckBackMutation<QueryResult<any, ErrorBackWork>>();
  ////////////////////////////===================================

  /////////////////////////////==================================
  const dispatch = useAppDispatch();
  useEffect(() => {
    getDataFromIndexDB(dispatch, dataUserSaveStore);
    changeBody(ChangeBgPages.LOGIN);
    checkOnlineStatus(setIsOffline);
    checkBack();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickChangeForm = () => {
    setIsVieEnterForm(!isVieEnterForm);
  };

  return (
    <>
      <main className="app__login-page page-bg-move">
        {isLoading && <LoaderPage />}
        {!isError && !isLoading && (
          <section className="container">
            <div className="app-login-page-forms">
              <WrapperForm errorValidation={errorsValidations.length > 0}>
                <SwitchTransition mode="out-in">
                  <CSSTransition
                    timeout={300}
                    classNames="change-form-loginPgae"
                    key={isVieEnterForm ? "1" : "2"}
                    in={isVieEnterForm}
                  >
                    {isVieEnterForm ? (
                      <LoginForm
                        seteErrorLog={seteErrorLog}
                        setErrorsValidations={setErrorsValidations}
                        handleClickChangeForm={handleClickChangeForm}
                      />
                    ) : (
                      <RegistrationForm
                        seteErrorReg={seteErrorReg}
                        setErrorsValidations={setErrorsValidations}
                        handleClickChangeForm={handleClickChangeForm}
                      />
                    )}
                  </CSSTransition>
                </SwitchTransition>
              </WrapperForm>
            </div>
          </section>
        )}
      </main>
      {/* <Alert
        isError={isOffline}
        handleBooleanValue={setIsOffline}
        message="У вас нет поключения к интернету"
        type="error"
      /> */}
      <Alert
        errorWorkBack={error}
        isError={isOffline}
        message={`Сейчас бэкенд этого сервиса не работает :(. Мы уже работает над этим. Попробуйте зайти позже. Так же проверте подключение к интернету.`}
        type="error"
      />
      <Alert
        message="У вас есть неправильные поля"
        type="error"
        errorsValidtionForm={errorsValidations}
        setRessetArray={setErrorsValidations}
      />
      <Alert
        message="У вас есть неправильные поля со значениями"
        type="error"
        errorsFromBack={errorReg}
      />
      <Alert type="error" errorsFromBack={errorLog} />
    </>
  );
};
