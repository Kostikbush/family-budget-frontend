import { useChatData } from "../../../hooks/chatData";
import { useAppSelectore } from "../../../hooks/redux";

export const ChatMessage = () => {
  const authData = useAppSelectore((state) => state.ayth);
  const chat = useAppSelectore((state) => state.chat);
  const message = useChatData(authData.chat, authData.email);

  const ws = message.ws;
  return (
    <section className="chat-message-content">
      <div className="message-content__items">
        {chat.messages.length > 0 ? (
          chat.messages.map((mes) => <span></span>)
        ) : (
          <span>Нет сообщений</span>
        )}
      </div>
    </section>
  );
};
