import { useEffect, useMemo, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { UserCart } from "./UserCart/UserCart";
import { ChangeBgPages } from "../../CONST/CONST";
import { changeBody } from "../../helpersFunc/changeBody";
import { useDebounce } from "../../hooks/debounce";
import { ISearchUser } from "../../models/IUser";
import { useFindUsersMutation } from "../../service/budgetApi";
import { Btn } from "../../UI/Btn/Btn";
import { Form } from "../../UI/Form/Form";
import { InputForm } from "../../UI/InputForm/InputForm";
import "./createBudget.scss";

export const CreateBudgetPage = () => {
  const [emailTo, setEmailTo] = useState("");
  const debounced = useDebounce(emailTo);
  useEffect(() => {
    changeBody(ChangeBgPages.CREATE_BUDGET);
  }, []);
  const [
    findUsers,
    {
      error: errorSearch,
      isError: isErrorUsers,
      isLoading: isLoadingUsers,
      data: users,
      status,
    },
  ] = useFindUsersMutation();
  useMemo(async () => {
    debounced.length >= 3 && (await findUsers({ email: debounced }));
  }, [debounced, findUsers]);
  console.log(isLoadingUsers, status, errorSearch, isErrorUsers);
  const handleClick = () => {};
  return (
    <section className="page-bg-createBudget page-bg-move">
      <article className="page-content-move">
        <Form styles="form-create-budget">
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
                        {users.map((user: ISearchUser) => (
                          <UserCart key={user.id} user={user} />
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

          <Btn waveColor="light" text="Найти" handleClick={handleClick} />
        </Form>
      </article>
    </section>
  );
};
