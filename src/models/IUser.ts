export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  alert: object;
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
