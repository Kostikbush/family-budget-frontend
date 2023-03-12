import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useChatData } from "../../../hooks/chatData";
import { useAppSelectore } from "../../../hooks/redux";
import { InputForm } from "../../../UI/InputForm/InputForm";

export const ChatControl = () => {
  const [messages, setMessage] = useState("");
  const authData = useAppSelectore((state) => state.ayth);
  const message = useChatData(authData.chat, authData.email);

  const ws = message.ws;

  const handleSend = () => {
    if (messages.trim() !== "") {
    }
  };
  return (
    <div className="chat-control-wrapper">
      <InputForm
        colorWrapper="input-wrapper-color-all account-text__chat-input"
        colorInput="input-color-all"
        placeholder="Введите текст сообщение"
        type="text"
        value={messages}
        setState={setMessage}
      />
      <button onClick={handleSend} className="sendMessage">
        <IoSend color="white" size={30} />
      </button>
    </div>
  );
};
