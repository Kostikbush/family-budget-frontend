/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useAppSelectore } from "../../../hooks/redux";
import { useGetBudgetMutation } from "../../../service/budgetApi";
import { Alert } from "../../../UI/Alert/Alert";

export const ContentInfo = () => {
  const authData = useAppSelectore((state) => state.ayth);
  const [getBudget, { data, isLoading }] = useGetBudgetMutation();
  useEffect(() => {
    getBudget({ email: authData.email });
  }, []);

  return (
    <>
      <div className="app-home-content__info app-home-content__item page-bg-move">
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
                      height={50}
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
              <div className="app-home-page-info__content">
                {data ? (
                  <div className="app-home-page-budget">
                    <h2>расходы на месяц</h2>
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
      {/* <Alert
        message="Ошибка загрузки бюджета. Проверте поключение к интернету."
        isError={isError}
        type="error"
      /> */}
    </>
  );
};
