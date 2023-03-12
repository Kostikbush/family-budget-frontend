import { useMemo, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router";

import { validateValue } from "../../../helpersFunc/validateValue";
import { useAppDispatch, useAppSelectore } from "../../../hooks/redux";
import { IErrorBackend } from "../../../models/IErrorBackend";
import { UserObject } from "../../../models/IUser";
import { QueryResult } from "../../../models/typeQueryResult";
import { useLoginUserMutation } from "../../../service/authApi";
import { savedDataUser } from "../../../store/reducers/UserAftorasationSlice";

import { Btn } from "../../../UI/Btn/Btn";
import { Form } from "../../../UI/Form/Form";
import { InputForm } from "../../../UI/InputForm/InputForm";
import { LoadingReqvest } from "../../../UI/LoadingReqvest/LoadingReqvest";

interface logprops {
  handleClickChangeForm: Function;
  setErrorsValidations: Function;
  seteErrorLog: Function;
}
export const LoginForm = ({
  seteErrorLog,
  handleClickChangeForm,
  setErrorsValidations,
}: logprops) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const authData = useAppSelectore((state) => state.ayth);
  const dispatch = useAppDispatch();
  const [
    loginUser,
    { isLoading: isLoginLoading, data: loginData, error: loginError },
  ] = useLoginUserMutation<QueryResult<UserObject, IErrorBackend>>();

  useMemo(() => {
    if (authData.name.trim() !== "") {
      setEmail(authData.email);
      setPassword(authData.password);
    }
  }, [authData.email, authData.name, authData.password]);
  useMemo(() => {
    if (loginData) {
      dispatch(
        savedDataUser({
          name: loginData.user.name,
          email: email.trim(),
          password: password.trim(),
          id: "",
          avatar: loginData.user.avatar,
          alert: loginData.user.alert,
          isSetComment: loginData.user.isSetComment,
          budget: loginData.user.budget,
          chat: loginData.user.chat,
        })
      );
      setTimeout(() => {
        navigate("/hello");
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);
  const handleEnter = () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
    ];
    setErrorsValidations([...errors]);
    !errors.length &&
      loginUser({ email: email.trim(), password: password.trim() });
  };
  useMemo(() => {
    if (loginError) {
      seteErrorLog(loginError);
    }
  }, [loginError, seteErrorLog]);

  return (
    <>
      {isLoginLoading && <LoadingReqvest />}
      <Form testID="form-enter-snap" styles="app-login-page-forms__form">
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
            testId="button-enter"
          />
          <Btn
            testId="btn-testCgangeForm"
            isReqvest={isLoginLoading}
            handleClick={handleClickChangeForm}
            children={<BsArrowRight size={17} className="arr-ml" />}
            text="Регистрация"
          />
        </div>
      </Form>
    </>
  );
};
