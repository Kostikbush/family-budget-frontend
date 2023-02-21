import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { ChangeBgPages } from "../../CONST/CONST";
import { changeBody } from "../../helpersFunc/changeBody";
import { useAppSelectore } from "../../hooks/redux";
import { useGetBudgetMutation } from "../../service/budgetApi";
import "./home.scss";

export const HomePage = () => {
  const authData = useAppSelectore((state) => state.ayth);
  const [getBudget, { data, error, isError, isLoading }] =
    useGetBudgetMutation();
  useEffect(() => {
    changeBody(ChangeBgPages.HOME);
    getBudget({ email: authData.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data, error, isError, isLoading);
  return (
    <section className="page-bg-move">
      <article className="app-home-page-content page-content-move">
        <div className="app-home-content__info app-home-content__item">
          <SwitchTransition mode="out-in">
            <CSSTransition
              timeout={300}
              key={isLoading ? "1" : "2"}
              in={isLoading}
              classNames={"changeScele"}
              unmountOnExit
            >
              {isLoading ? (
                <>
                  <SkeletonTheme baseColor="#deb88780" highlightColor="#fff">
                    <p className="app-home-sceleton__wrapper">
                      <Skeleton
                        borderRadius={10}
                        width={200}
                        height={20}
                        count={1}
                      />
                      <Skeleton
                        borderRadius={10}
                        width={200}
                        height={300}
                        count={1}
                      />
                    </p>
                  </SkeletonTheme>
                </>
              ) : (
                <div className="app-home-page__content">
                  {data ? (
                    <div className="app-home-page-budget">
                      <h2>Список ваших предстоящих расходов на месяц</h2>
                      <article></article>
                    </div>
                  ) : (
                    <h2 className="app-home-page-no-budget">
                      У вас пока не создан бюджет
                    </h2>
                  )}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </article>
    </section>
  );
};
