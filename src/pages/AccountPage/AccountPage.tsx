/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate } from "react-router";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { OpponentAndYou } from "../../Components/OpponentAndYou/OpponentAndYou";
import { BsPencilFill } from "react-icons/bs";

import { ChangeBgPages } from "../../CONST/ChangeBgPages";
import { changeBody } from "../../helpersFunc/changeBody";
import { deleteDataBaseIndexDb } from "../../helpersFunc/saved";
import { useAppDispatch, useAppSelectore } from "../../hooks/redux";

import {
  useChangeNameMutation,
  useDeleteAccountMutation,
  useGetImagesMutation,
  useSetImagesMutation,
} from "../../service/authApi";
import { useGetBudgetMutation } from "../../service/budgetApi";
import { savedDataUser } from "../../store/reducers/UserAftorasationSlice";
import { Alert } from "../../UI/Alert/Alert";
import { Btn } from "../../UI/Btn/Btn";
import { InputForm } from "../../UI/InputForm/InputForm";
import { LoadingReqvest } from "../../UI/LoadingReqvest/LoadingReqvest";
import "./account.scss";
import { validateValue } from "../../helpersFunc/validateValue";

interface img {
  name: string;
  content: string;
}
export const AccountPage = () => {
  let navigate = useNavigate();
  const [isChangename, setIsChangename] = useState(false);
  const [isWontDeleteAccount, setIsWontDeleteAccount] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const dispatch = useAppDispatch();
  const authData = useAppSelectore((state) => state.ayth);
  const [getBudget, { data: budget, isLoading: isLoadingBudget }] =
    useGetBudgetMutation();
  //
  const [
    setImage,
    { data: newUser, isLoading: isLoadingNewUser, isError: isErrorNewUser },
  ] = useSetImagesMutation();
  //
  const [
    getImagesMutation,
    { data: images, isError: isErrorImg, isLoading: isLoadImg },
  ] = useGetImagesMutation();
  //
  const [
    deleteAccount,
    { data: deleteUser, isError: isDeleteError, isLoading: isLoadingDelete },
  ] = useDeleteAccountMutation();
  //
  const [
    changeName,
    {
      data: changeUser,
      isLoading: isLoadingChangeName,
      isError: isErrorChangeName,
    },
  ] = useChangeNameMutation();
  const [imagesFromBack, setImagesFromBack] = useState(images);
  useEffect(() => {
    changeBody(ChangeBgPages.ACCOUNT);
    getBudget({ email: authData.email });
  }, []);

  useMemo(() => {
    if (images) {
      setImagesFromBack(images);
    }
  }, [images]);

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
          budget: newUser.budget,
          chat: newUser.chat,
        })
      );
    }
  }, [newUser]);
  useMemo(() => {
    if (changeUser) {
      dispatch(
        savedDataUser({
          name: changeUser.name,
          email: authData.email,
          password: authData.password,
          id: "",
          avatar: authData.avatar,
          alert: changeUser.alert,
          isSetComment: changeUser.isSetComment,
          budget: changeUser.budget,
          chat: changeUser.chat,
        })
      );
    }
  }, [changeUser]);
  useMemo(() => {
    if (deleteUser && deleteUser === "ok") {
      deleteDataBaseIndexDb();
      navigate("/login");
    }
  }, [deleteUser]);
  const deleteAccountF = () => {
    deleteAccount({ email: authData.email, password: authData.password });
  };
  const handleChangename = (string: string) => {
    const errorsVal = validateValue(string, "name");

    errorsVal.length === 0 &&
      changeName({ email: authData.email, name: string });
    errorsVal.length > 0 && setErrors(errorsVal);
  };

  return (
    <>
      <section className="page-bg-account page-bg-move">
        <article className="page-content-move">
          <div className="app-account-page__content">
            {isLoadImg && <LoadingReqvest />}
            {isLoadingDelete && <LoadingReqvest />}
            <div className="account-item__avatar">
              {authData.avatar !== "" ? (
                <img
                  src={`data:image/svg+xml,${encodeURIComponent(
                    authData.avatar
                  )}`}
                  alt="SVGImage"
                />
              ) : (
                authData.name.slice(0, 1)
              )}
              <button
                onClick={() => getImagesMutation()}
                className="account-item__changeIcon"
              >
                <BsPlusCircle size={20} />
              </button>
            </div>
            <div className="account-name__wrapper">
              <SwitchTransition mode="out-in">
                <CSSTransition
                  timeout={300}
                  key={isChangename ? "1" : "2"}
                  in={isChangename}
                  classNames={"changeScele"}
                  unmountOnExit
                >
                  {isChangename ? (
                    <div className="account-change__input">
                      {isLoadingChangeName && <LoadingReqvest />}
                      <InputForm
                        type="text"
                        value={newName}
                        placeholder="Введите новое имя"
                        colorWrapper="input-wrapper-color-all account-name__change"
                        colorInput="input-color-all"
                        setState={setNewName}
                      />
                      <BsPencilFill
                        className="pen-change-form"
                        onClick={() => handleChangename(newName)}
                        size={15}
                        color="white"
                      />
                      <RxCross2
                        className="cross-change-form"
                        color="white"
                        size={17}
                        onClick={() => setIsChangename(false)}
                      />
                    </div>
                  ) : (
                    <h2 className="account-item__name">
                      {authData.name}{" "}
                      <BsPencilFill
                        color="white"
                        className="pen-change-form"
                        onClick={() => setIsChangename(true)}
                        size={20}
                      />
                    </h2>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </div>
            <div className="account-item__budget">
              <SwitchTransition mode="out-in">
                <CSSTransition
                  timeout={300}
                  key={isLoadingBudget ? "1" : "2"}
                  in={isLoadingBudget}
                  classNames={"changeScele"}
                  unmountOnExit
                >
                  {isLoadingBudget ? (
                    <SkeletonTheme baseColor="#a887de" highlightColor="#fff">
                      <p className="app-home-sceleton__wrapper">
                        <Skeleton
                          borderRadius={10}
                          width={200}
                          height={200}
                          count={1}
                        />
                      </p>
                    </SkeletonTheme>
                  ) : (
                    <div className="home-budget__content">
                      {!budget && (
                        <span className="home-budget__noBudget">
                          У вас ещё не создан бюджет
                        </span>
                      )}
                      {budget && (
                        <article className="home-budget-info">
                          <OpponentAndYou page="chat" budgetId={budget._id} />
                          <OpponentAndYou page="acc" budgetId={budget._id} />
                        </article>
                      )}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </div>
            <Btn
              style={{
                marginBottom: "20px",
              }}
              isReqvest={isLoadingDelete}
              handleClick={() => setIsWontDeleteAccount(true)}
              border="border-violet"
              waveColor="light"
              text="Удалить Аккаунт"
            />
          </div>
          <div
            className={
              imagesFromBack
                ? "account-img-choose-avatar account-img-choose-avatar-active"
                : "account-img-choose-avatar account-img-choose-avatar-disabled"
            }
          >
            <button
              onClick={() => setImagesFromBack(null)}
              className="choose-avatar__close"
            >
              <RxCross2 color="white" size={30} />
            </button>
            <span className="choose-avatar__item">
              {imagesFromBack &&
                imagesFromBack.map((image: img, index: number) => (
                  <div key={index}>
                    {isLoadingNewUser ? (
                      <img
                        width={60}
                        height={60}
                        src={`data:image/svg+xml,${encodeURIComponent(
                          image.content
                        )}`}
                        alt={`SVGImage ${index}`}
                      />
                    ) : (
                      <img
                        onClick={() =>
                          setImage({
                            avatar: image.content,
                            email: authData.email,
                          })
                        }
                        className="choose-avatar-item__img"
                        key={index}
                        width={60}
                        height={60}
                        src={`data:image/svg+xml,${encodeURIComponent(
                          image.content
                        )}`}
                        alt={`SVGImage ${index}`}
                      />
                    )}
                  </div>
                ))}
              <span
                onClick={() => setImage({ avatar: "", email: authData.email })}
                className="choose-avatar-item__name"
              >
                {authData.name && authData.name.slice(0, 1)}
              </span>
            </span>
            {isLoadingNewUser && <LoadingReqvest />}
          </div>
        </article>
      </section>
      <Alert
        isError={isErrorImg}
        type="error"
        message="Ошибка загрузки картинок"
      />
      <Alert
        isError={isErrorNewUser}
        type="error"
        message="Попробуйте снова выбрать картинку позже"
      />
      <Alert
        isError={isDeleteError}
        type="error"
        message="Попробуйте снова выбрать картинку позже"
      />
      <Alert
        isError={isErrorChangeName}
        type="error"
        message="Ошибка при изменении имени"
      />
      <Alert
        type="error"
        message="Имя должно быть от 3 до 12 символов"
        errorsValidtionForm={errors}
      />
      <Alert
        message="При удалении аккаунта вы удалите и ваш общий бюджет. Вы точно хотите удалить аккаунт? "
        type="choose"
        vieAlert={isWontDeleteAccount}
        handleBooleanValue={setIsWontDeleteAccount}
        chooseYes={deleteAccountF}
      />
    </>
  );
};
