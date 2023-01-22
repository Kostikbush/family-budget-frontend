import { useEffect, useMemo, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import { validateValue } from "../../controlFunc/validateValue";
import { WrapperForm } from "../../Components/WrapperForm/WrapperForm";
import { InputForm } from "../../Components/InputForm/InputForm";
import { Btn } from "../../Components/Btn/Btn";
import { Alert } from "../../Components/Alert/Alert";
import {
  useLoginUserMutation,
  useRegistUserMutation,
} from "../../service/authApi";

import { useAppSelectore, useAppDispatch } from "../../hooks/redux";
import {
  dataUserSaveStore,
  savedDataUser,
} from "../../store/reducers/UserAftorasationSlice";
import { isErrorWithMessage } from "../../models/IErrorBackend";
import { Form } from "../../Components/Form/Form";
import "./login.scss";
import { getDataFromIndexDB } from "../../saved-indexDB/saved";

export const LoginPage = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorValidation, setIsErrorValidation] = useState(false);
  const [isVieEnterForm, setIsVieEnterForm] = useState(true);
  const [errorsValidations, setErrorsValidations] = useState<string[]>([]);
  const [isErrorFromBackend, setIsErrorFromBackend] = useState(false);
  const [isLoadingRespFromBack, setIsLoadingRespFromBack] = useState(false);
  const [isExitLoginPage, setIsExitLoginPage] = useState(false);
  const [
    loginUser,
    {
      isLoading: isLoginLoading,
      data: loginData,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registrationUser,
    {
      data: dataRegistration,
      isLoading: isLoadingRegistration,
      isError: isErrorRegistration,
      error: errorRegistration,
    },
  ] = useRegistUserMutation();
  ////////////////////////////===================================

  /////////////////////////////-----------------------------------
  const authData = useAppSelectore((state) => state.ayth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getDataFromIndexDB(dispatch, dataUserSaveStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickChangeForm = () => {
    setIsVieEnterForm(!isVieEnterForm);
    setEmail("");
    setName("");
    setPassword("");
  };
  const handleEnter = async () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
    ];
    setErrorsValidations([...errors]);
    errors.length && setIsErrorValidation(true);

    !errors.length && (await loginUser({ email: email, password: password }));
  };
  const handleRegistration = async () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
      ...validateValue(name, "name"),
    ];
    setErrorsValidations([...errors]);
    errors.length && setIsErrorValidation(true);

    !errors.length && (await registrationUser({ name, email, password }));
  };
  useMemo(() => {
    if (isErrorValidation === false) {
      setErrorsValidations([]);
    }
  }, [isErrorValidation]);
  useMemo(() => {
    isLoginError && setIsErrorFromBackend(true);
    isErrorRegistration && setIsErrorFromBackend(true);
  }, [isLoginError, isErrorRegistration]);
  useMemo(() => {
    isLoginLoading && setIsLoadingRespFromBack(true);
    isLoadingRegistration && setIsLoadingRespFromBack(true);
    if (isLoginLoading === false && isLoadingRegistration === false) {
      setIsLoadingRespFromBack(false);
    }
  }, [isLoginLoading, isLoadingRegistration]);

  useMemo(() => {
    if (authData.name !== "") {
      setEmail(authData.email);
      setName(authData.name);
      setPassword(authData.password);
    }
  }, [authData]);
  useMemo(() => {
    if (dataRegistration) {
      dispatch(savedDataUser({ name, email, password }));
      setIsExitLoginPage(true);
      console.log("registration");
      setTimeout(() => {
        navigate("/hello");
      }, 700);
    }
    if (loginData) {
      setIsExitLoginPage(true);
      setTimeout(() => {
        navigate("/hello");
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRegistration, loginData]);
  return (
    <section className={isExitLoginPage ? "page-exit" : "page-enter"}>
      <main
        className={isErrorValidation ? `login-page page-blur` : "login-page"}
      >
        <section className="container">
          <div className="login-page__forms">
            <WrapperForm
              isLoadingReq={isLoadingRespFromBack}
              errorValidation={isErrorValidation}
            >
              <SwitchTransition mode="out-in">
                <CSSTransition
                  timeout={350}
                  classNames="form-change"
                  key={isVieEnterForm ? "1" : "2"}
                  in={isVieEnterForm}
                  unmountOnExit
                >
                  {isVieEnterForm ? (
                    <Form
                      testID="form-enter-snap"
                      styles="form-container__enter"
                    >
                      <h2>Вход</h2>
                      <div className="enter__inputs">
                        <InputForm
                          value={email}
                          placeholder="Введите email"
                          type="text"
                          setState={setEmail}
                        />
                        <InputForm
                          value={password}
                          placeholder="Введите пароль"
                          type="password"
                          setState={setPassword}
                        />
                      </div>
                      <div className="enter__btns">
                        <Btn
                          type="submit"
                          isReqvest={isLoginLoading}
                          text="Войти"
                          handleClick={handleEnter}
                        />
                        <Btn
                          testId="btn-testCgangeForm"
                          isReqvest={isLoginLoading}
                          handleClick={handleClickChangeForm}
                          children={
                            <BsArrowRight size={17} className="arr-ml" />
                          }
                          text="Регистрация"
                        />
                      </div>
                    </Form>
                  ) : (
                    <Form styles="form-container__enter">
                      <h2 data-testid="h2-registration">Регистрация</h2>
                      <div className="registration__inputs">
                        <InputForm
                          placeholder="Введите имя"
                          type="text"
                          setState={setName}
                        />
                        <InputForm
                          placeholder="Введите email"
                          type="text"
                          setState={setEmail}
                        />
                        <InputForm
                          placeholder="Введите пароль"
                          type="password"
                          setState={setPassword}
                        />
                      </div>
                      <div className="enter__btns">
                        <Btn
                          isReqvest={isLoadingRegistration}
                          handleClick={handleRegistration}
                          text="Зарегистрироваться"
                        />
                        <Btn
                          isReqvest={isLoadingRegistration}
                          handleClick={handleClickChangeForm}
                          children={
                            <BsArrowRight size={17} className="arr-ml" />
                          }
                          text="Вход"
                        />
                      </div>
                    </Form>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </WrapperForm>
          </div>
        </section>
      </main>
      {isErrorValidation && (
        <Alert
          value={isErrorValidation}
          handleValue={setIsErrorValidation}
          message="У вас есть неправильные заполненные поля"
          type="error"
        >
          <ul className="error-login">
            {errorsValidations.map((error, i) => (
              <li key={i}>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </Alert>
      )}
      {isErrorFromBackend && (
        <Alert
          value={isErrorFromBackend}
          handleValue={setIsErrorFromBackend}
          message="Ошибка при авторизации"
          type="error"
        >
          {isVieEnterForm && loginError && "data" in loginError && (
            <ul className="error-login">
              <li>
                <span>
                  {isErrorWithMessage(loginError) &&
                    "message" in loginError.data &&
                    loginError.data.message + "."}
                </span>
              </li>
            </ul>
          )}
          {!isVieEnterForm &&
            errorRegistration &&
            "data" in errorRegistration && (
              <ul className="error-login">
                <li className="error-reg">
                  <span>
                    {isErrorWithMessage(errorRegistration) &&
                      // eslint-disable-next-line no-useless-concat
                      errorRegistration.data.message + ". " + " Испрвте поля:"}
                  </span>
                  <span className="errors-list">
                    {isErrorWithMessage(errorRegistration) &&
                      errorRegistration.data.errors.map((objError) => (
                        <span>{objError.param}</span>
                      ))}
                  </span>
                </li>
              </ul>
            )}
        </Alert>
      )}
    </section>
  );
};
