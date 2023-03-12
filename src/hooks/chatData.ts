import { useRef } from "react";
import { MessageFromBack } from "../CONST/MessageFromBack";
import { IMessageFromBack } from "../models/IWebSocket";

interface IMessage {
  user: string;
  message: string;
  isRead: boolean;
  date: {
    day: number;
    mounth: number;
    year: number;
  };
}

export const useChatData = (
  chatId: string | null | undefined,
  email: string
) => {
  const ws = new WebSocket(
    `ws://192.168.0.102:5000/api/chat/${chatId}/${email}`
  );
  const messageFromBack = useRef<IMessageFromBack>({
    type: MessageFromBack.START,
    value: "",
  });
  if (chatId !== null) {
    ws.addEventListener("message", (e) => {
      messageFromBack.current = JSON.parse(e.data);
    });

    ws.addEventListener("close", () => {
      messageFromBack.current = {
        type: MessageFromBack.ERROR,
        value: null,
      };
    });
    return { message: messageFromBack.current, ws: ws };
  }
  return { message: messageFromBack.current, ws: ws };
};
export const sendWs = (message: IMessage, ws: WebSocket) => {
  ws.addEventListener("open", () => {
    ws.send(JSON.stringify(message));
  });
};
