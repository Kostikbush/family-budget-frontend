/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useAppSelectore } from "../../hooks/redux";
import { IFromBackUser } from "../../models/IUser";
import { useGetOpponentMutation } from "../../service/authApi";

import "./opponent.scss";

export const OpponentAndYou = ({
  budgetId,
  page,
}: {
  budgetId: string;
  page: "acc" | "chat";
}) => {
  const authData = useAppSelectore((state) => state.ayth);
  const [getOpponent, { data: opponent, isLoading }] = useGetOpponentMutation();
  useEffect(() => {
    getOpponent({ budgetId: budgetId });
  }, []);

  const oppon =
    opponent &&
    opponent.length &&
    opponent.filter((op: IFromBackUser) => op.email !== authData.email);
  const singleOpp = oppon ? oppon[0] : { avatar: "", name: "" };
  return (
    <div className="budget__icons">
      {page === "chat" && (
        <div className="budget-icons__wrapper">
          <SwitchTransition mode="out-in">
            <CSSTransition
              timeout={300}
              key={isLoading ? "1" : "2"}
              in={isLoading}
              classNames={"changeScele"}
              unmountOnExit
            >
              {isLoading ? (
                <SkeletonTheme baseColor="#a887de" highlightColor="#fff">
                  <p className="budget-icons__item-sceleton">
                    <Skeleton
                      borderRadius={50}
                      width={60}
                      height={60}
                      count={1}
                    />
                    <Skeleton
                      className="icons-item-you"
                      borderRadius={50}
                      width={60}
                      height={60}
                      count={1}
                    />
                  </p>
                </SkeletonTheme>
              ) : (
                <>
                  <span className="budget-icons__item">
                    {singleOpp.avatar !== "" ? (
                      <img
                        width={60}
                        height={60}
                        src={`data:image/svg+xml,${encodeURIComponent(
                          singleOpp.avatar
                        )}`}
                        alt="SVGImage"
                      />
                    ) : (
                      <span>{singleOpp.name.slice(0, 1)}</span>
                    )}
                  </span>
                  <span className="budget-icons__item icons-item-you">
                    {authData.avatar !== "" ? (
                      <img
                        width={60}
                        height={60}
                        src={`data:image/svg+xml,${encodeURIComponent(
                          authData.avatar
                        )}`}
                        alt="SVGImage"
                      />
                    ) : (
                      <span>{authData.name.slice(0, 1)}</span>
                    )}
                  </span>
                </>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      )}
      {page === "acc" && (
        <>
          <SwitchTransition mode="out-in">
            <CSSTransition
              timeout={300}
              key={isLoading ? "1" : "2"}
              in={isLoading}
              classNames={"changeScele"}
              unmountOnExit
            >
              {isLoading ? (
                <SkeletonTheme baseColor="#a887de" highlightColor="#fff">
                  <Skeleton
                    className="icons-sceleton__text"
                    width={210}
                    height={40}
                    count={1}
                    borderRadius={10}
                  />
                </SkeletonTheme>
              ) : (
                <span className="opponent__name">
                  Буджет создан с {singleOpp.name}
                </span>
              )}
            </CSSTransition>
          </SwitchTransition>
        </>
      )}
    </div>
  );
};
