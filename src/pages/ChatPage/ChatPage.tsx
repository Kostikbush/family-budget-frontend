/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { ChangeBgPages } from "../../CONST/ChangeBgPages";
import { changeBody } from "../../helpersFunc/changeBody";
import { useAppDispatch, useAppSelectore } from "../../hooks/redux";

import "./chat.scss";
import { ChatControl } from "./Components/ChatControl";
import { ChatMessage } from "./Components/ChatMessage";
import { TitleChat } from "./Components/TitleChat";

export const ChatPage = () => {
  const [styleHeight, setStyleHeight] = useState(
    document.documentElement.offsetHeight
  );
  useMemo(() => {
    console.log(document.documentElement.offsetHeight);
    setStyleHeight(document.documentElement.offsetHeight);
  }, [document.documentElement]);
  useEffect(() => {
    changeBody(ChangeBgPages.CHAT);
  }, []);
  return (
    <section
      // style={{
      //   height: styleHeight - 70 + "px",
      // }}
      className="page-bg-move page-100"
    >
      <article className="page-content-move chat-page">
        <TitleChat />
        <ChatMessage />
        <ChatControl />
      </article>
    </section>
  );
};
