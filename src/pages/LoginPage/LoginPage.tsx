import { useMemo, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";

import { Btn } from "../../Components/Btn/Btn";
import { Form } from "../../Components/Form/From";
import { InputForm } from "../../Components/InputForm/InputForm";
import { useAppSelectore, useAppDispatch } from "../../hooks/redux";

import "./login.scss";
export const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vieEnterForm, setVieEnterForm] = useState(true);
  const data = useAppSelectore((state) => state.userAftorasationSlice);
  const dispath = useAppDispatch();
  const handleEnter = () => {};
  const handleRegistration = () => {};
  return (
    <>
      <header></header>
      <main className="login-page">
        <section className="container">
          <div className="login-page__forms">
            <CSSTransition
              timeout={500}
              classNames="form-change"
              in={vieEnterForm}
              unmountOnExit
            >
              <Form
                handleRegistartion={handleRegistration}
                handleEnter={handleEnter}
                vieEnterForm={vieEnterForm}
                setOnClickChangeForm={setVieEnterForm}
                setPassword={setPassword}
                setName={setName}
                setEmail={setEmail}
                name={name}
                email={email}
                password={password}
                type="enter"
              />
            </CSSTransition>

            {/* <CSSTransition
              timeout={500}
              classNames="form-change"
              in={!vieEnterForm}
              unmountOnExit
            >
              <Form type="exit" />
            </CSSTransition> */}
          </div>
        </section>
      </main>
    </>
  );
};
