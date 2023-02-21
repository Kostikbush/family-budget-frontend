export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  alert: object;
  isSetComment: boolean;
}
export interface ISearchUser {
  activationLink: string;
  alert: Array<Object>;
  email: string;
  isActivated: boolean;
  name: string;
  password: string;
  __v: number;
  id: string;
}
