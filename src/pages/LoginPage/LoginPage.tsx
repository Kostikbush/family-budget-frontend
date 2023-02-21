import { useEffect, useMemo, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import { validateValue } from "../../helpersFunc/validateValue";
import { WrapperForm } from "../../UI/WrapperForm/WrapperForm";
import { InputForm } from "../../UI/InputForm/InputForm";
import { Btn } from "../../UI/Btn/Btn";
import { Alert } from "../../UI/Alert/Alert";
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
import { Form } from "../../UI/Form/Form";
import "./login.scss";
import { getDataFromIndexDB } from "../../helpersFunc/saved";
import { changeBody } from "../../helpersFunc/changeBody";
import { ChangeBgPages } from "../../CONST/CONST";
import { LoadingReqvest } from "../../UI/LoadingReqvest/LoadingReqvest";

export const LoginPage = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVieEnterForm, setIsVieEnterForm] = useState(true);
  const [isBluerPage, setIsBluerPage] = useState(false);
  const [errorsValidations, setErrorsValidations] = useState<string[]>([]);
  const [isOffline, setIsOffline] = useState(false);
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

  /////////////////////////////==================================
  const authData = useAppSelectore((state) => state.ayth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getDataFromIndexDB(dispatch, dataUserSaveStore);
    changeBody(ChangeBgPages.LOGIN);
    const checkOnlineStatus = async () => {
      try {
        const online = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        if (online.status >= 200 && online.status < 300) {
          setIsOffline(false);
        } else {
          setIsOffline(true);
          setIsBluerPage(true);
        }
      } catch (err) {
        setIsOffline(true);
        setIsBluerPage(true);
      }
    };
    checkOnlineStatus();
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
    errors.length && setIsBluerPage(true);
    !errors.length && (await loginUser({ email: email, password: password }));
  };
  const handleRegistration = async () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
      ...validateValue(name, "name"),
    ];
    setErrorsValidations([...errors]);
    errors.length && setIsBluerPage(true);

    !errors.length && (await registrationUser({ name, email, password }));
  };

  useMemo(() => {
    if (authData.name.trim() !== "") {
      setEmail(authData.email);
      setName(authData.name);
      setPassword(authData.password);
    }
  }, [authData.email, authData.name, authData.password]);
  useMemo(() => {
    if (dataRegistration) {
      dispatch(
        savedDataUser({
          name,
          email,
          password,
          id: "",
          avatar: "",
          alert: [],
          isSetComment: dataRegistration.user.isSetComment,
        })
      );
      setTimeout(() => {
        navigate("/hello");
      }, 700);
    }
    if (loginData) {
      dispatch(
        savedDataUser({
          name: loginData.user.name,
          email,
          password,
          id: "",
          avatar: loginData.user.avatar,
          alert: loginData.user.alert,
          isSetComment: loginData.user.isSetComment,
        })
      );
      setTimeout(() => {
        navigate("/hello");
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRegistration, loginData]);
  const handleResetError = () => {
    setIsBluerPage(false);
    setErrorsValidations([]);
    setIsOffline(false);
  };
  return (
    <>
      <main className={isBluerPage ? `page-blur` : "app__login-page"}>
        <section className="container">
          <div className="app-login-page-forms">
            <WrapperForm errorValidation={errorsValidations.length > 0}>
              {isLoadingRegistration && <LoadingReqvest />}
              {isLoginLoading && <LoadingReqvest />}
              <SwitchTransition mode="out-in">
                <CSSTransition
                  timeout={300}
                  classNames="change-form-loginPgae"
                  key={isVieEnterForm ? "1" : "2"}
                  in={isVieEnterForm}
                >
                  {isVieEnterForm ? (
                    <Form
                      testID="form-enter-snap"
                      styles="app-login-page-forms__form"
                    >
                      <h2>Вход</h2>
                      <div className="app-login-page-forms-form-registration-input">
                        <InputForm
                          colorInput="input-color-login"
                          colorWrapper="input-wrapper-color-login"
                          value={email}
                          placeholder="Введите email"
                          type="text"
                          setState={setEmail}
                        />
                        <InputForm
                          colorInput="input-color-login"
                          colorWrapper="input-wrapper-color-login"
                          value={password}
                          placeholder="Введите пароль"
                          type="password"
                          setState={setPassword}
                        />
                      </div>
                      <div className="app-login-page-forms-form__btns">
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
                    <Form styles="app-login-page-forms__form">
                      <h2 data-testid="h2-registration">Регистрация</h2>
                      <div className="app-login-page-forms-form__inputs">
                        <InputForm
                          colorInput="input-color-login"
                          colorWrapper="input-wrapper-color-login"
                          placeholder="Введите имя"
                          type="text"
                          setState={setName}
                        />
                        <InputForm
                          colorInput="input-color-login"
                          colorWrapper="input-wrapper-color-login"
                          placeholder="Введите email"
                          type="text"
                          setState={setEmail}
                        />
                        <InputForm
                          colorInput="input-color-login"
                          colorWrapper="input-wrapper-color-login"
                          placeholder="Введите пароль"
                          type="password"
                          setState={setPassword}
                        />
                      </div>
                      <div className="app-login-page-forms-form__btns">
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
      {errorsValidations.length > 0 && (
        <Alert
          handleValue={handleResetError}
          message="У вас есть неправильные заполненные поля"
          type="error"
        >
          <ul className="app-error-login">
            {errorsValidations.map((error, i) => (
              <li key={i}>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </Alert>
      )}
      {isOffline && (
        <Alert
          value={isOffline}
          handleValue={handleResetError}
          message="У вас нет поключения к интернету"
          type="error"
        ></Alert>
      )}
      {isLoginError && (
        <Alert
          handleValue={handleResetError}
          value={isLoginError}
          message="Ошибка при авторизации"
          type="error"
        >
          {isVieEnterForm && loginError && "data" in loginError && (
            <ul className="app-error-login">
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
              <ul className="app-error-login">
                <li className="app-error-login__error-reg">
                  <span>
                    {isErrorWithMessage(errorRegistration) &&
                      // eslint-disable-next-line no-useless-concat
                      errorRegistration.data.message + ". " + " Испрвте поля:"}
                  </span>
                  <span className="app-error-login-error-reg__errors-list">
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
      {isErrorRegistration && (
        <Alert
          value={isLoginError}
          message="Ошибка при авторизации"
          type="error"
          handleValue={handleResetError}
        >
          {isVieEnterForm &&
            errorRegistration &&
            "data" in errorRegistration && (
              <ul className="app-error-login">
                <li>
                  <span>
                    {isErrorWithMessage(errorRegistration) &&
                      "message" in errorRegistration.data &&
                      errorRegistration.data.message + "."}
                  </span>
                </li>
              </ul>
            )}
        </Alert>
      )}
    </>
  );
};
