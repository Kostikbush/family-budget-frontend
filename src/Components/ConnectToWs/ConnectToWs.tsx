/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useChatData } from "../../hooks/chatData";
import { MessageFromBack } from "../../CONST/MessageFromBack";
import { useAppDispatch, useAppSelectore } from "../../hooks/redux";
import { Alert } from "../../UI/Alert/Alert";
import { actionChat } from "../../store/reducers/ChatData";

export const ConnectToWs = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelectore((state) => state.ayth);
  const message = useChatData(authData.chat, authData.email);
  useMemo(() => {
    if (message) {
      "message" in message && dispatch(actionChat(message.message));
    }
  }, [message]);
  return (
    <>
      {message &&
        "message" in message &&
        message.message.type === MessageFromBack.ERROR && (
          <Alert
            message="Не удалось подключиться к чату."
            isError={
              message.message && message.message.type === MessageFromBack.ERROR
            }
            type="error"
          />
        )}
    </>
  );
};
