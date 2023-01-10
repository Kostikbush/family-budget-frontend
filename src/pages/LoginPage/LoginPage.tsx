import { useEffect, useMemo, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { BsArrowRight } from "react-icons/bs";

import { validateValue } from "../../controlFunc/validateValue";
import { Form } from "../../Components/Form/From";
import { InputForm } from "../../Components/InputForm/InputForm";
import { Btn } from "../../Components/Btn/Btn";
import { Alert } from "../../Components/Alert/Alert";
import {
  useLoginUserMutation,
  useRegistrationUserMutation,
} from "../../service/authApi";
import { useAppSelectore, useAppDispatch } from "../../hooks/redux";
import { getDataUser, savedDataUser } from "../../store/reducers/UserSlice";
import "./login.scss";
import { isErrorWithMessage } from "../../models/IErrorBackend";

export const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorValidation, setIsErrorValidation] = useState(false);
  const [isVieEnterForm, setIsVieEnterForm] = useState(true);
  const [errorsValidations, setErrorsValidations] = useState<string[]>([]);
  const [isErrorFromBackend, setIsErrorFromBackend] = useState(false);
  const [isLoadingRespFromBack, setIsLoadingRespFromBack] = useState(false);
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
  ] = useRegistrationUserMutation();

  const authData = useAppSelectore((state) => state.ayth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDataUser());
    setEmail(authData.email);
    setName(authData.name);
    setPassword(authData.password);
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

    !errors.length && (await loginUser({ email, password }));
  };
  const handleRegistration = () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
      ...validateValue(name, "name"),
    ];
    setErrorsValidations([...errors]);
    errors.length && setIsErrorValidation(true);

    !errors.length && registrationUser({ name, email, password });

    //dispatch(savedDataUser({ email: email, name: name, password: password }));
  };
  useMemo(() => {
    if (errorsValidations.length && isErrorValidation === false) {
      setErrorsValidations([]);
    }
  }, [errorsValidations, isErrorValidation]);
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
  console.log(dataRegistration, authData, errorsValidations);
  return (
    <>
      <main
        className={isErrorValidation ? `login-page page-blur` : "login-page"}
      >
        <section className="container">
          <div className="login-page__forms">
            <Form
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
                    <div className="form-container__enter">
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
                          isReqvest={isLoginLoading}
                          text="Войти"
                          handleClick={handleEnter}
                        />
                        <Btn
                          isReqvest={isLoginLoading}
                          handleClick={handleClickChangeForm}
                          children={
                            <BsArrowRight size={17} className="arr-ml" />
                          }
                          text="Регистрация"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="form-container__enter">
                      <h2>Регистрация</h2>
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
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </Form>
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
          {loginError && "data" in loginError && (
            <ul className="error-login">
              <li>
                <span>
                  {isErrorWithMessage(loginError) &&
                    "message" in loginError.data &&
                    loginError.data.message}
                </span>
              </li>
            </ul>
          )}
          {errorRegistration && "data" in errorRegistration && (
            <ul className="error-login">
              <li>
                <span>
                  {isErrorWithMessage(errorRegistration) &&
                    "message" in errorRegistration.data &&
                    errorRegistration.data.message}
                </span>
              </li>
            </ul>
          )}
        </Alert>
      )}
    </>
  );
};
