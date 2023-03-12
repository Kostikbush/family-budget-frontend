import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageFromBack } from "../../CONST/MessageFromBack";
import {
  IAddMessageFromBack,
  IChangeMessageFromBack,
  IDeleteMessageFromBack,
  IMessageFromBack,
  Message,
} from "../../models/IWebSocket";

import { RootState } from "../store";

interface chatState {
  error: string;
  notreadMessage: boolean;
  oponentWright: boolean;
  messages: Message[];
}
const initialState: chatState = {
  error: "",
  notreadMessage: false,
  oponentWright: false,
  messages: [],
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    actionChat(state, action: PayloadAction<IMessageFromBack>) {
      if (
        action.payload.type === MessageFromBack.GET_CHAT ||
        action.payload.type === MessageFromBack.NEW_CHAT ||
        action.payload.type === MessageFromBack.CHANGE_MESSAGE ||
        action.payload.type === MessageFromBack.DELETE_MESSAGE
      ) {
        if (Array.isArray(action.payload.value)) {
          console.log("WORK REDUCER");
          state.messages = action.payload.value;
        }
      } else if (action.payload.type === MessageFromBack.ERROR) {
        if (typeof action.payload.value === "string") {
          state.error = action.payload.value;
        }
      } else if (
        action.payload.type === MessageFromBack.START_WRITING ||
        action.payload.type === MessageFromBack.END_WRITING
      ) {
        action.payload.type === MessageFromBack.START_WRITING
          ? (state.oponentWright = true)
          : (state.oponentWright = false);
      }
    },
    addMessage(state, action: PayloadAction<IAddMessageFromBack>) {
      const date = new Date();
      const savedMessage = {
        _id: `${Math.random()}`,
        isRead: false,
        message: action.payload.value.message,
        user: action.payload.value.id,
        date: {
          year: date.getFullYear(),
          mounth: date.getMonth(),
          day: date.getDate(),
        },
      };
      state.messages = [savedMessage, ...state.messages];
    },
    changeMessage(state, action: PayloadAction<IChangeMessageFromBack>) {
      state.messages.map((mes) => {
        if (mes._id === action.payload.value.id) {
          return { ...mes, message: action.payload.value.newMessage };
        }
        return mes;
      });
    },
    deleteMessage(state, action: PayloadAction<IDeleteMessageFromBack>) {
      state.messages.filter((mes) => mes._id !== action.payload.value);
    },
  },
});

export const { actionChat, addMessage, changeMessage, deleteMessage } =
  chatDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chat;
export default chatDataSlice.reducer;
