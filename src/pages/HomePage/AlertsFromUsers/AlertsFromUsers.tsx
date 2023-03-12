/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelectore } from "../../../hooks/redux";
import { IErrorBackend } from "../../../models/IErrorBackend";
import { IFromBackUser } from "../../../models/IUser";
import { QueryResult } from "../../../models/typeQueryResult";
import { useGetUserMutation } from "../../../service/authApi";
import {
  useAnserMutation,
  useGetBudgetMutation,
} from "../../../service/budgetApi";
import { savedDataUser } from "../../../store/reducers/UserAftorasationSlice";
import { Alert } from "../../../UI/Alert/Alert";
import { Btn } from "../../../UI/Btn/Btn";
import { LoadingReqvest } from "../../../UI/LoadingReqvest/LoadingReqvest";
import "./alertsFromUsers.scss";
export const AlertsFromUsers = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [
    getUser,
    { data: user, isError: isErrorUser, isLoading: isLoadingUser },
  ] = useGetUserMutation<QueryResult<IFromBackUser, IErrorBackend>>();
  const [getBudget, { data: budget, isLoading: isLoadingBudget }] =
    useGetBudgetMutation();
  const [
    anser,
    { data: anserData, isError: isAnserError, isLoading: isLoadingAnser },
  ] = useAnserMutation();
  const authData = useAppSelectore((state) => state.ayth);
  useEffect(() => {
    getUser({ email: authData.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAnser = (anse: "Yes" | "No") => {
    anser({
      anser: {
        fromUser: authData.email,
        anser: anse,
      },
    });
  };
  useMemo(() => {
    if (anserData && "message" in anserData) {
      setTimeout(() => {
        anserData !== undefined &&
          anserData.message === "Бюджет с чатом создан" &&
          navigate("/hello");
      }, 2000);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
    getUser({ email: authData.email });
  }, [anserData]);
  useMemo(() => {
    if (user) {
      dispatch(
        savedDataUser({
          name: user.name,
          email: user.email,
          password: authData.password,
          id: "",
          avatar: user.avatar,
          alert: user.alert,
          isSetComment: user.isSetComment,
          budget: user.budget,
          chat: user.chat,
        })
      );
    }
    if (anserData) {
      getBudget({ email: authData.email });
    }
  }, [user, anserData]);
  return (
    <>
      <CSSTransition
        timeout={300}
        unmountOnExit
        in={user && user?.alert.length > 0}
        classNames="home-message"
      >
        <section className="app-home-content__alert app-home-content__item page-bg-move">
          {isLoadingUser && <LoadingReqvest />}
          {isLoadingAnser && <LoadingReqvest />}
          {isLoadingBudget && <LoadingReqvest />}
          <article className="app-home-alert__content">
            {user && user.alert.length > 0 && (
              <div className="home-alert-content-item">
                <h3>Уведомление</h3>
                <div className="home-alert-content-item__message">
                  {user.alert[0].message}
                </div>
                <div className="home-alert-content-item__anser">
                  <Btn
                    isReqvest={
                      isLoadingAnser || isLoadingBudget || isLoadingUser
                    }
                    handleClick={() => handleAnser("Yes")}
                    waveColor="light"
                    border="border-yellow"
                    text="Да"
                  />
                  <Btn
                    isReqvest={
                      isLoadingAnser || isLoadingBudget || isLoadingUser
                    }
                    handleClick={() => handleAnser("No")}
                    waveColor="light"
                    border="border-yellow"
                    text="Нет"
                  />
                </div>
              </div>
            )}
          </article>
        </section>
      </CSSTransition>
      <Alert
        message="Не получилось обновить ваши данные"
        type="error"
        isError={isErrorUser}
      />
      <Alert
        type="error"
        isError={isAnserError}
        message="Ошибка отправки ответа. Если вы подтвердили добавление расхода, то скорее всего вам не хватает доходов на этот расход."
      />
      <Alert
        type="success"
        vieAlert={anserData ? true : false}
        message={anserData !== undefined && anserData.message}
      />
      <Alert
        type="success"
        vieAlert={budget ? true : false}
        message="Бюджет успешно обновлён"
      />
    </>
  );
};
