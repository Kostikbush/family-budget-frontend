export interface alertItem {
  id: string;
  userFrom: string;
  userTo: string;
  theme: string;
  message: string;
  _id: string;
}
export interface IFromBackUser {
  activationLink?: string;
  alert: alertItem[];
  email: string;
  avatar: string;
  isActivated?: boolean;
  isSetComment: boolean;
  name: string;
  password: string;
  __v?: number;
  id: string;
  budget: string | null | undefined;
  chat: string | null | undefined;
}

export interface UserObject {
  user: IFromBackUser;
}
