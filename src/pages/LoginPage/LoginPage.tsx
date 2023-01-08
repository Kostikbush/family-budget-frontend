import { useMemo, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { BsArrowRight } from "react-icons/bs";

import { validateValue } from "../../controlFunc/validateValue";
import { Form } from "../../Components/Form/From";
import { InputForm } from "../../Components/InputForm/InputForm";
import { Btn } from "../../Components/Btn/Btn";
import { Alert } from "../../Components/Alert/Alert";
import "./login.scss";

export const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorValidation, setErrorValidation] = useState(false);
  const [vieEnterForm, setVieEnterForm] = useState(true);
  const [errorsValidations, setErrorsValidations] = useState<string[]>([]);
  const handleClickChangeForm = () => {
    setVieEnterForm(!vieEnterForm);
    setEmail("");
    setName("");
    setPassword("");
  };
  // const data = useAppSelectore((state) => state.userAftorasationSlice);
  // const dispath = useAppDispatch();

  const handleEnter = () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
    ];
    setErrorsValidations([...errors]);
    errors.length && setErrorValidation(true);
  };
  const handleRegistration = () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
      ...validateValue(name, "name"),
    ];
    setErrorsValidations([...errors]);
    errors.length && setErrorValidation(true);
  };
  useMemo(() => {
    if (errorsValidations.length && errorValidation === false) {
      setErrorsValidations([]);
    }
  }, [errorsValidations, errorValidation]);
  return (
    <>
      <main className={errorValidation ? `login-page page-blur` : "login-page"}>
        <section className="container">
          <div className="login-page__forms">
            <Form errorValidation={errorValidation}>
              <SwitchTransition mode="out-in">
                <CSSTransition
                  timeout={350}
                  classNames="form-change"
                  key={vieEnterForm ? "1" : "2"}
                  in={vieEnterForm}
                  unmountOnExit
                >
                  {vieEnterForm ? (
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
                        <Btn text="Войти" handleClick={handleEnter} />
                        <Btn
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
                          handleClick={handleRegistration}
                          text="Зарегистрироваться"
                        />
                        <Btn
                          handleClick={handleClickChangeForm}
                          children={
                            <BsArrowRight size={17} className="arr-ml" />
                          }
                          text="Войти"
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

      {errorValidation && (
        <Alert
          value={errorValidation}
          handleValue={setErrorValidation}
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
    </>
  );
};
