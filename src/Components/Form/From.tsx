import { MouseEventHandler } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Btn } from "../Btn/Btn";
import { InputForm } from "../InputForm/InputForm";
import "./form.scss";

interface FormProps {
  type: "enter" | "registration";
  setName: Function | any;
  setPassword: Function;
  setEmail: Function;
  handleEnter: MouseEventHandler;
  setOnClickChangeForm: Function;
  name: string;
  email: string;
  password: string;
  vieEnterForm: boolean;
  handleRegistartion: MouseEventHandler;
}

export const Form = ({
  type,
  setName,
  vieEnterForm,
  setPassword,
  setEmail,
  handleRegistartion,
  setOnClickChangeForm,
  name,
  email,
  password,
  handleEnter,
}: FormProps) => {
  const handleClickChangeForm = () => {
    setOnClickChangeForm(!vieEnterForm);
  };
  return (
    <article className="form-container">
      {type === "enter" && (
        <div className="form-container__enter">
          <h2>Вход</h2>
          <div className="enter__inputs">
            <InputForm
              value={name}
              placeholder="Введите имя"
              type="text"
              setState={setName}
            />
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
      )}
      {type === "registration" && (
        <div className="form-container__enter">
          <h2>Регистрация</h2>
          <div className="enter__inputs">
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
              type="text"
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
      )}
    </article>
  );
};
