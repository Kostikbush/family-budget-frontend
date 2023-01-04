import { useState } from "react";
//useMemo, useRef,
import { Form } from "../../Components/Form/From";

//import { useAppSelectore, useAppDispatch } from "../../hooks/redux";

import "./login.scss";
export const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const data = useAppSelectore((state) => state.userAftorasationSlice);
  //const dispath = useAppDispatch();
  const handleEnter = () => {};
  const handleRegistration = () => {};
  return (
    <>
      <header></header>
      <main className="login-page">
        <section className="container">
          <div className="login-page__forms">
            <Form
              handleRegistartion={handleRegistration}
              handleEnter={handleEnter}
              setPassword={setPassword}
              setName={setName}
              setEmail={setEmail}
              name={name}
              email={email}
              password={password}
            />
          </div>
        </section>
      </main>
    </>
  );
};
