import { MessageFromBack } from "../CONST/MessageFromBack";

export type Message = {
  isRead: boolean;
  _id: string;
  message: string;
  user: string;
  date: {
    day: number;
    mounth: number;
    year: number;
  };
};

export interface IMessageFromBack {
  type:
    | MessageFromBack.ADD_MESSAGE
    | MessageFromBack.CHANGE_MESSAGE
    | MessageFromBack.DELETE_MESSAGE
    | MessageFromBack.END_WRITING
    | MessageFromBack.ERROR
    | MessageFromBack.GET_CHAT
    | MessageFromBack.NEW_CHAT
    | MessageFromBack.START_WRITING
    | MessageFromBack.START;
  value: Message[] | null | string;
}
export interface IAddMessageFromBack {
  type: MessageFromBack.ADD_MESSAGE;
  value: {
    id: string;
    message: string;
  };
}
export interface IChangeMessageFromBack {
  type: MessageFromBack.CHANGE_MESSAGE;
  value: {
    id: string;
    newMessage: string;
  };
}
export interface IDeleteMessageFromBack {
  type: MessageFromBack.CHANGE_MESSAGE;
  value: string;
}
