import { useEffect, useMemo, useState } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { useAppDispatch, useAppSelectore } from "../../hooks/redux";
import "react-loading-skeleton/dist/skeleton.css";

import "./helloPage.scss";
import useImagePreloader from "../../hooks/preloadImg";
import { dataUserSaveStore } from "../../store/reducers/UserAftorasationSlice";
import { getDataFromIndexDB } from "../../saved-indexDB/saved";
import { useNavigate } from "react-router";

const img1 = require("../../assets/img/hello/day.jpg");
const img2 = require("../../assets/img/hello/evening.jpg");
const img3 = require("../../assets/img/hello/night.jpg");

let preloadSrcList: string[];
const date = new Date();
const timeNow = date.getHours();

if (timeNow >= 6 && timeNow < 10) {
  preloadSrcList = [img2];
}
if (timeNow >= 10 && timeNow < 18) {
  preloadSrcList = [img1];
}
if (timeNow >= 18 && timeNow < 22) {
  preloadSrcList = [img2];
}
if (timeNow >= 22 && timeNow <= 24) {
  preloadSrcList = [img3];
}
if (timeNow >= 0 && timeNow < 6) {
  preloadSrcList = [img3];
}
export const HelloPage = () => {
  let navigate = useNavigate();
  const [isExitHelloPage, setIsExitHelloPage] = useState(false);
  const [howTime, setHowTime] = useState("");
  const dispatch = useAppDispatch();
  const authData = useAppSelectore((state) => state.ayth);

  const { imagesPreloaded } = useImagePreloader(preloadSrcList);
  useMemo(() => {
    if (imagesPreloaded) {
      setTimeout(() => {
        setIsExitHelloPage(!isExitHelloPage);
      }, 5000);
      setTimeout(() => {
        navigate("/home");
      }, 5390);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesPreloaded]);

  useEffect(() => {
    if (authData.name.trim() === "") {
      getDataFromIndexDB(dispatch, dataUserSaveStore);
    }
    const date = new Date();
    const timeNow = date.getHours();

    if (timeNow >= 6 && timeNow < 10) {
      setHowTime("morning");
    }
    if (timeNow >= 10 && timeNow < 18) {
      setHowTime("day");
    }
    if (timeNow >= 18 && timeNow < 22) {
      setHowTime("evning");
    }
    if (timeNow >= 22 && timeNow <= 24) {
      setHowTime("night");
    }
    if (timeNow >= 0 && timeNow < 6) {
      setHowTime("night");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {imagesPreloaded && (
        <main className={isExitHelloPage ? "page-exit" : "page-enter"}>
          <section
            className={`
        hello-page-wrapper
        ${howTime === "morning" && "hello-page-wrapper-morning"}
        ${howTime === "day" && "hello-page-wrapper-day"}
        ${howTime === "evning" && "hello-page-wrapper-evning"}
        ${howTime === "night" && "hello-page-wrapper-night"}
        `}
          >
            <BsPatchCheck size={35} className="icon-hello" />
            <p>
              {howTime === "morning" && (
                <span>Доброе утро {authData.name}!</span>
              )}

              {howTime === "day" && <span> Добрый день {authData.name}!</span>}

              {howTime === "evning" && (
                <span>Добрый вечер {authData.name}!</span>
              )}

              {howTime === "night" && <span>Доброй ночи {authData.name}!</span>}
            </p>
          </section>
        </main>
      )}{" "}
    </>
  );
};
