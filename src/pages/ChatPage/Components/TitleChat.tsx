/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useAppSelectore } from "../../../hooks/redux";
import { IFromBackUser } from "../../../models/IUser";
import { useGetOpponentMutation } from "../../../service/authApi";

export const TitleChat = () => {
  const authData = useAppSelectore((state) => state.ayth);
  const [getOpponent, { data: opponent, isLoading }] = useGetOpponentMutation();
  useEffect(() => {
    getOpponent({ budgetId: authData.budget || "" });
  }, []);
  const oppon =
    opponent &&
    opponent.length &&
    opponent.filter((op: IFromBackUser) => op.email !== authData.email);
  const singleOpp = oppon ? oppon[0] : { avatar: "", name: "" };
  return (
    <h2 className="chat-page__title">
      <SwitchTransition mode="out-in">
        <CSSTransition
          timeout={300}
          key={isLoading ? "1" : "2"}
          in={isLoading}
          classNames={"changeScele"}
          unmountOnExit
        >
          {isLoading ? (
            <SkeletonTheme baseColor="#d150cf65" highlightColor="#fff">
              <p className="app-chat-sceleton-title">
                <Skeleton borderRadius={50} width={60} height={60} count={1} />
                <Skeleton borderRadius={10} width={100} height={20} count={1} />
              </p>
            </SkeletonTheme>
          ) : (
            <>
              <span className="chat-page-title__avatar">
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
                  <>{singleOpp.name.slice(0, 1)}</>
                )}
              </span>
              <span>{singleOpp.name}</span>
            </>
          )}
        </CSSTransition>
      </SwitchTransition>
    </h2>
  );
};
