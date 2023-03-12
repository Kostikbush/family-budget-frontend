/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { ChangeBgPages } from "../../CONST/ChangeBgPages";
import { changeBody } from "../../helpersFunc/changeBody";
import { useAppDispatch, useAppSelectore } from "../../hooks/redux";
import {
  useAddCommentMutation,
  useGetCommentMutation,
} from "../../service/authApi";
import { savedDataUser } from "../../store/reducers/UserAftorasationSlice";
import { Alert } from "../../UI/Alert/Alert";
import { Btn } from "../../UI/Btn/Btn";
import { LoadingReqvest } from "../../UI/LoadingReqvest/LoadingReqvest";

import "./commentPage.scss";
import { SmileComponent } from "./SmileComponent/SmileComponent";
interface comment {
  email: string;
  comment: string;
  name: string;
  smile: "angry" | "sad" | "ok" | "good" | "happy";
}
export const CommentPage = () => {
  const [newComments, setNewComments] = useState([]);
  const dispatch = useAppDispatch();
  const [styleItems, setStyleItems] = useState({});
  const [left, setLeft] = useState(30);
  const [smileActive, setSmileActive] = useState("happy");
  const [comment, setComment] = useState("");
  const authData = useAppSelectore((state) => state.ayth);

  const [
    getComment,
    { data: comments, error: errorComment, isLoading: isLoadingComment },
  ] = useGetCommentMutation();
  const [addComment, { data: user, isLoading }] = useAddCommentMutation();
  useEffect(() => {
    changeBody(ChangeBgPages.COMMENT);
    getComment();
  }, []);
  const addCommentN = () => {
    if (smileActive.trim() === "") {
      return;
    } else {
      addComment({
        comment: comment,
        email: authData.email,
        smile: smileActive,
      });
      getComment();
    }
  };
  useMemo(() => {
    if (user) {
      getComment();
      setTimeout(() => {
        dispatch(
          savedDataUser({
            name: authData.name,
            email: authData.email,
            password: authData.password,
            id: "",
            avatar: user.avatar,
            alert: user.alert,
            isSetComment: user.isSetComment,
            budget: user.budget,
            chat: user.chat,
          })
        );
      }, 300);
    }
  }, [user]);

  const ternLeft = () => {
    if (left > 0) {
      setStyleItems({ ...styleItems, left: 30 + "px" });
      setLeft(30);
    } else {
      setStyleItems({ ...styleItems, left: left + 290 + "px" });
      setLeft(left + 290);
    }
  };
  const ternRight = () => {
    if (comments && comments.length * -290 >= left - 320) {
      setStyleItems({
        ...styleItems,
        left: 30 + "px",
      });
      setLeft(30);
    } else {
      setStyleItems({ ...styleItems, left: left - 290 + "px" });
      setLeft(left - 290);
    }
  };
  useMemo(() => {
    if (
      comments &&
      comments.length > 0 &&
      comments !== "never" &&
      comments !== undefined
    ) {
      setNewComments(comments.slice().reverse());
    }
    if (comments && comments.length > 0) {
      setStyleItems({
        width: `${comments.length * 600}px`,
        left: "30px",
      });
    }
  }, [comments]);
  return (
    <>
      <section className="page-bg-move">
        <article className="page-content-move page-comment">
          <h2>Отзывы пользователей</h2>
          <div className="comment__content">
            <SwitchTransition mode="out-in">
              <CSSTransition
                timeout={300}
                key={isLoadingComment ? "1" : "2"}
                in={isLoadingComment}
                classNames={"changeScele"}
                unmountOnExit
              >
                {!isLoadingComment ? (
                  <article className="comment-wrapper">
                    {newComments && newComments.length > 0 && (
                      <div style={styleItems} className="comment-wrapper-items">
                        {newComments.map((comment: comment, index: number) => (
                          <div className="comment-item" key={index}>
                            <h3 className="comment-item__name">
                              {comment.name}
                            </h3>
                            <SmileComponent active={comment.smile} />
                            <p>{comment.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {newComments && newComments.length === 0 && (
                      <span className="comment-item__noComments">
                        У приложения ещё нет отзывов
                      </span>
                    )}
                    {newComments && newComments.length > 1 && (
                      <p className="comments__controllers">
                        <AiOutlineArrowLeft
                          className={
                            left === 30 ? "comments-control__left" : ""
                          }
                          onClick={ternLeft}
                          size={20}
                          color="white"
                        />
                        <AiOutlineArrowRight
                          onClick={ternRight}
                          size={20}
                          color="white"
                        />
                      </p>
                    )}
                  </article>
                ) : (
                  <SkeletonTheme
                    borderRadius={10}
                    baseColor="#bf000024"
                    highlightColor="#c6c6c640"
                  >
                    <p className="sceleton-creatBudget">
                      <Skeleton width={250} height={250} count={1} />
                    </p>
                  </SkeletonTheme>
                )}
              </CSSTransition>
            </SwitchTransition>
          </div>
          {authData.isSetComment === false && (
            <article
              className={
                user && user.isSetComment === true
                  ? "remove__addComment comment__addComment"
                  : "comment__addComment"
              }
            >
              {isLoading && <LoadingReqvest />}
              <h3>Оставте отзыв о приложении и вы!</h3>
              <div>
                <SmileComponent setActiveSmile={setSmileActive} />
              </div>
              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.currentTarget.value)}
                  className="comment__input-color-wrapper"
                />
              </div>

              <Btn
                isReqvest={isLoading}
                border="border-red"
                waveColor="light"
                handleClick={addCommentN}
                text="Отправить"
              />
            </article>
          )}
        </article>
      </section>
      <Alert
        isError={smileActive === "" ? true : false}
        type="error"
        message="У вас не выбран смаил!"
      />
      <Alert type="error" isError={errorComment ? true : false} />
    </>
  );
};
