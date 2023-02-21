/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useMemo, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import { ChangeBgPages } from "../../CONST/CONST";
import { changeBody } from "../../helpersFunc/changeBody";
import { deleteDataBaseIndexDb } from "../../helpersFunc/saved";
import { useAppDispatch, useAppSelectore } from "../../hooks/redux";
import {
  useDeleteAccountMutation,
  useGetImagesMutation,
  useSetImagesMutation,
} from "../../service/authApi";
import { useGetBudgetMutation } from "../../service/budgetApi";
import { savedDataUser } from "../../store/reducers/UserAftorasationSlice";
import { Alert } from "../../UI/Alert/Alert";
import { Btn } from "../../UI/Btn/Btn";
import { LoadingReqvest } from "../../UI/LoadingReqvest/LoadingReqvest";
import "./account.scss";
interface img {
  name: string;
  content: string;
}
export const AccountPage = () => {
  let navigate = useNavigate();
  const [bluerPage, setBluerPage] = useState(false);
  const dispatch = useAppDispatch();
  const authData = useAppSelectore((state) => state.ayth);
  const [getBudget, { data, isLoading }] = useGetBudgetMutation();
  const [
    setImage,
    { data: newUser, isLoading: isLoadingNewUser, error: errorNewUser },
  ] = useSetImagesMutation();
  const [
    getImagesMutation,
    { data: images, error: errorImage, isLoading: isLoadImg },
  ] = useGetImagesMutation();
  const [
    deleteAccount,
    { data: deleteUser, error: deleteError, isLoading: isLoadingDelete },
  ] = useDeleteAccountMutation();
  const [imagesFromBack, setImagesFromBack] = useState(images);
  useEffect(() => {
    changeBody(ChangeBgPages.ACCOUNT);
    getBudget({ email: authData.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleGetImage = () => {
    getImagesMutation();
  };
  useMemo(() => {
    if (errorImage || images) {
      setBluerPage(true);
    } else {
      setBluerPage(false);
    }
    if (images) {
      setImagesFromBack(images);
    }
  }, [errorImage, images]);
  const handleCloseChooseAvatar = () => {
    setBluerPage(false);
    setTimeout(() => {
      setImagesFromBack(null);
    }, 500);
  };
  const handleSetAvatar = (string: string) => {
    setImage({ avatar: string, email: authData.email });
  };
  useMemo(() => {
    if (newUser) {
      dispatch(
        savedDataUser({
          name: authData.name,
          email: authData.email,
          password: authData.password,
          id: "",
          avatar: newUser.avatar,
          alert: newUser.alert,
          isSetComment: newUser.isSetComment,
        })
      );
    }
  }, [authData.email, authData.name, authData.password, dispatch, newUser]);
  useMemo(() => {
    if (errorNewUser && errorImage) {
      setBluerPage(true);
      setTimeout(() => {
        setBluerPage(false);
      }, 5000);
    }
    if (errorImage && !images) {
      setBluerPage(true);
      setTimeout(() => {
        setBluerPage(false);
      }, 5000);
    }
  }, [errorImage, errorNewUser, images]);
  const deleteAccountF = () => {
    deleteAccount({ email: authData.email, password: authData.password });
  };
  useMemo(() => {
    if (deleteUser && deleteUser === "ok") {
      deleteDataBaseIndexDb();
      navigate("/login");
    }
  }, [deleteUser]);
  return (
    <>
      <section className="page-bg-account page-bg-move">
        <article className="page-content-move">
          <div
            className={
              bluerPage
                ? "app-account-page__content page-blur"
                : "app-account-page__content"
            }
          >
            {isLoadImg && <LoadingReqvest />}
            {isLoadingDelete && <LoadingReqvest />}
            <div className="account-item__avatar">
              {authData.avatar !== "" ? (
                <img
                  src={`data:image/svg+xml,${encodeURIComponent(
                    authData.avatar
                  )}`}
                  alt="SVG Image"
                />
              ) : (
                authData.name.slice(0, 1)
              )}
              <button
                onClick={handleGetImage}
                className="account-item__changeIcon"
              >
                <BsPlusCircle size={20} />
              </button>
            </div>
            <h2 className="account-item__name">{authData.name}</h2>
            <div className="account-item__budget">
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
                      <p className="app-home-sceleton__wrapper">
                        <Skeleton
                          borderRadius={10}
                          width={200}
                          height={60}
                          count={1}
                        />
                      </p>
                    </SkeletonTheme>
                  ) : (
                    <>
                      {!data && <span>У вас ещё не создан бюджет</span>}
                      {data && <span>{data}</span>}
                    </>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </div>
            <Btn
              style={{
                marginBottom: "20px",
              }}
              isReqvest={isLoadingDelete}
              handleClick={deleteAccountF}
              border="border-violet"
              waveColor="light"
              text="Удалить Аккаунт"
            />
          </div>
          {imagesFromBack && (
            <div
              className={
                bluerPage
                  ? "account-img-choose-avatar account-img-choose-avatar-active"
                  : "account-img-choose-avatar account-img-choose-avatar-disabled"
              }
            >
              <button
                onClick={handleCloseChooseAvatar}
                className="choose-avatar__close"
              >
                <RxCross2 color="white" size={30} />
              </button>
              <span className="choose-avatar__item">
                {imagesFromBack.map((image: img, index: number) => (
                  <div key={index}>
                    {isLoadingNewUser ? (
                      <img
                        width={60}
                        height={60}
                        src={`data:image/svg+xml,${encodeURIComponent(
                          image.content
                        )}`}
                        alt={`SVG Image ${index}`}
                      />
                    ) : (
                      <img
                        onClick={() => handleSetAvatar(image.content)}
                        className="choose-avatar-item__img"
                        key={index}
                        width={60}
                        height={60}
                        src={`data:image/svg+xml,${encodeURIComponent(
                          image.content
                        )}`}
                        alt={`SVG Image ${index}`}
                      />
                    )}
                  </div>
                ))}
                <span
                  onClick={() => handleSetAvatar("")}
                  className="choose-avatar-item__name"
                >
                  {authData.name.slice(0, 1)}
                </span>
              </span>
              {isLoadingNewUser && <LoadingReqvest />}
            </div>
          )}
        </article>
      </section>
      {errorImage && <Alert type="error" message="Ошибка загрузки картинок" />}
      {errorNewUser && (
        <Alert type="error" message="Попробуйте снова выбрать картинку позже" />
      )}
      {deleteError && (
        <Alert
          alert={{}}
          type="error"
          message="Ошибка удаления аккаунта. Попробуйте залогиниться снова с правильным паролем и email"
        />
      )}
    </>
  );
};
