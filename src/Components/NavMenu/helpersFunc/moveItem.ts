/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const moveItem = (
  to: string,
  e: React.DragEvent,
  setStyle: Function,
  setIsDragDrop: Function
) => {
  if (to === "left") {
    setIsDragDrop(true);
  } else if (to === "end") {
    setStyle({
      top: `${e.pageY}px`,
      left: `${e.pageX}px`,
    });
    setIsDragDrop(false);
  }
};

export const moveThone = (e: React.TouchEvent, setStyle: Function) => {
  setStyle({
    top: `${e.changedTouches[0].pageY}px`,
    left: `${e.changedTouches[0].pageX}px`,
  });
};
export const moveEndAndStart = (state: "start" | "end") => {
  // let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // if (state === "start") {
  //   document.body.style.overflow = "hidden";
  //   window.onscroll = function () {
  //     window.scrollTo(0, scrollTop);
  //   };
  // } else {
  //   document.body.style.overflow = "";
  // }
};
