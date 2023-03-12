/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { UserCart } from "./UserCart/UserCart";
import { ChangeBgPages } from "../../CONST/ChangeBgPages";
import { changeBody } from "../../helpersFunc/changeBody";
import { useDebounce } from "../../hooks/debounce";
import { IFromBackUser } from "../../models/IUser";
import {
  useCreateBudgetMutation,
  useFindUsersMutation,
  useGetBudgetMutation,
} from "../../service/budgetApi";
import { Btn } from "../../UI/Btn/Btn";
import { Form } from "../../UI/Form/Form";
import { InputForm } from "../../UI/InputForm/InputForm";
import "./createBudget.scss";
import { useAppSelectore } from "../../hooks/redux";
import { Alert } from "../../UI/Alert/Alert";
import { LoadingReqvest } from "../../UI/LoadingReqvest/LoadingReqvest";
import { useNavigate } from "react-router";
import { QueryResult } from "../../models/typeQueryResult";
import { IErrorBackend } from "../../models/IErrorBackend";
export interface AnserFromCreateBudget {
  text: string;
  id: string;
}
export const CreateBudgetPage = () => {
  let navigate = useNavigate();
  const [isResetActive, setIsResetActive] = useState(false);
  const [isNoActiveUser, setIsNoActiveUser] = useState(false);
  const [userActive, setUsersActive] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const authData = useAppSelectore((state) => state.ayth);

  const debounced = useDebounce(emailTo);
  const [creatBudget, { isLoading, error, data }] =
    useCreateBudgetMutation<
      QueryResult<AnserFromCreateBudget, IErrorBackend>
    >();
  const [getBudget, { data: budget }] = useGetBudgetMutation();

  useEffect(() => {
    changeBody(ChangeBgPages.CREATE_BUDGET);
    getBudget({ email: authData.email });
  }, []);

  const [findUsers, { isLoading: isLoadingUsers, data: users }] =
    useFindUsersMutation();

  useMemo(async () => {
    debounced.length >= 3 &&
      (await findUsers({ email: debounced, emailFrom: authData.email }));
  }, [authData.email, debounced, findUsers]);
  useMemo(() => {
    if (data) {
      setTimeout(() => {
        navigate("/home");
      }, 8000);
    }
  }, [data, navigate]);
  const handleClickUser = (email: string) => {
    if (userActive === "") {
      setUsersActive(email);
    } else if (userActive !== "" && !budget) {
      setIsResetActive(true);
      setUsersActive("");
    }
  };

  const handleClick = () => {
    if (userActive.trim() !== "") {
      const expens = {};
      const emailTo = userActive;
      const emailFrom = authData.email;
      const theme = {
        title: "Создать общий сюжет",
        message: `Пользователь ${emailFrom} хочет создать с вами общий буджет`,
      };
      creatBudget({ emailFrom, emailTo, theme, expens });
    } else {
      setIsNoActiveUser(true);
    }
  };
  return (
    <>
      <section className="page-bg-move app-page-createBudget">
        <article className="page-content-move form-create-budget__wrapper">
          <Form styles="form-create-budget">
            {isLoading && <LoadingReqvest />}
            <div>
              <h3>ЧЕЛОВЕК С КОТОРЫМ ХОТИТЕ СОЗДАТЬ ОБЩИЙ БЮДЖЕТ</h3>
              <InputForm
                colorInput="input-color-create"
                colorWrapper="input-wrapper-color-create"
                setState={setEmailTo}
                value={emailTo}
                placeholder="email не меньше 3-х букв"
                type="text"
              />

              <SwitchTransition mode="out-in">
                <CSSTransition
                  timeout={300}
                  key={isLoadingUsers ? "1" : "2"}
                  in={isLoadingUsers}
                  classNames={"changeScele"}
                  unmountOnExit
                >
                  {isLoadingUsers ? (
                    <>
                      <SkeletonTheme baseColor="#3abbd2" highlightColor="#fff">
                        <p className="sceleton-creatBudget">
                          <Skeleton height={30} count={8} />
                        </p>
                      </SkeletonTheme>
                    </>
                  ) : (
                    <div className="wrapper-resultSerchOfUsers">
                      {users && users.length > 0 && (
                        <ul className="wrapper-resultSerchOfUsers__list-userCarts">
                          {users.map((user: IFromBackUser, index: number) => (
                            <UserCart
                              isResetActive={isResetActive}
                              handleClick={handleClickUser}
                              key={index}
                              user={user}
                            />
                          ))}
                        </ul>
                      )}
                      {users && users.length === 0 && (
                        <span>Пользователи не найдены</span>
                      )}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </div>

            <Btn
              border="border-blue"
              waveColor="light"
              text="Создать"
              handleClick={handleClick}
            />
          </Form>
        </article>
      </section>
      <Alert
        type="error"
        handleBooleanValue={setIsNoActiveUser}
        message="У вас нет выбранных пользователей!"
        isError={isNoActiveUser}
      />
      <Alert type="error" errorsFromBack={error} />
      <Alert
        vieAlert={data ? true : false}
        type="success"
        message={data ? data.text : ""}
      />
      <Alert
        isError={budget ? true : false}
        type="error"
        message="Бюджет уже создан"
      />
    </>
  );
};
