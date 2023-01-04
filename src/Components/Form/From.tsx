import { MouseEventHandler, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import { Btn } from "../Btn/Btn";
import { InputForm } from "../InputForm/InputForm";
import "./form.scss";

interface FormProps {
  setName: Function | any;
  setPassword: Function;
  setEmail: Function;
  handleEnter: MouseEventHandler;
  name: string;
  email: string;
  password: string;
  handleRegistartion: MouseEventHandler;
}

export const Form = ({
  setName,
  setPassword,
  setEmail,
  handleRegistartion,
  name,
  email,
  password,
  handleEnter,
}: FormProps) => {
  const [vieEnterForm, setVieEnterForm] = useState(true);
  const handleClickChangeForm = () => {
    setVieEnterForm(!vieEnterForm);
  };
  return (
    <article className="form-container">
      {vieEnterForm && (
        <CSSTransition
          timeout={500}
          classNames="form-change"
          in={vieEnterForm}
          unmountOnExit
        >
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
                children={<BsArrowRight className="arr-ml" />}
                text="Регистрация"
              />
            </div>
          </div>
        </CSSTransition>
      )}
      {!vieEnterForm && (
        <CSSTransition
          timeout={500}
          classNames="form-change"
          in={!vieEnterForm}
          unmountOnExit
        >
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
              <Btn handleClick={handleRegistartion} text="Зарегистрироваться" />
              <Btn
                handleClick={handleClickChangeForm}
                children={<BsArrowRight className="arr-ml" />}
                text="Войти"
              />
            </div>
          </div>
        </CSSTransition>
      )}
    </article>
  );
};
