import { useMemo, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router";

import { validateValue } from "../../../helpersFunc/validateValue";
import { useAppDispatch } from "../../../hooks/redux";
import { IErrorBackend } from "../../../models/IErrorBackend";
import { UserObject } from "../../../models/IUser";
import { QueryResult } from "../../../models/typeQueryResult";
import { useRegistUserMutation } from "../../../service/authApi";
import { savedDataUser } from "../../../store/reducers/UserAftorasationSlice";
import { Btn } from "../../../UI/Btn/Btn";
import { Form } from "../../../UI/Form/Form";
import { InputForm } from "../../../UI/InputForm/InputForm";
import { LoadingReqvest } from "../../../UI/LoadingReqvest/LoadingReqvest";

interface reqProps {
  handleClickChangeForm: Function;
  setErrorsValidations: Function;
  seteErrorReg: Function;
}
export const RegistrationForm = ({
  seteErrorReg,
  handleClickChangeForm,
  setErrorsValidations,
}: reqProps) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    registrationUser,
    {
      data: dataRegistration,
      isLoading: isLoadingRegistration,
      error: errorRegistration,
    },
  ] = useRegistUserMutation<QueryResult<UserObject, IErrorBackend>>();
  useMemo(() => {
    if (dataRegistration) {
      dispatch(
        savedDataUser({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          id: "",
          avatar: "",
          alert: [],
          isSetComment: dataRegistration.user.isSetComment,
          chat: null,
          budget: null,
        })
      );
      setTimeout(() => {
        navigate("/hello");
      }, 700);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRegistration]);
  const handleRegistration = async () => {
    const errors = [
      ...validateValue(email, "email"),
      ...validateValue(password, "password"),
      ...validateValue(name, "name"),
    ];
    setErrorsValidations([...errors]);

    !errors.length &&
      registrationUser({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
  };
  useMemo(() => {
    if (errorRegistration) {
      seteErrorReg(errorRegistration);
    }
  }, [errorRegistration, seteErrorReg]);
  return (
    <>
      {isLoadingRegistration && <LoadingReqvest />}
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
            children={<BsArrowRight size={17} className="arr-ml" />}
            text="Вход"
          />
        </div>
      </Form>
    </>
  );
};
