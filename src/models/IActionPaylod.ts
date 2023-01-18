export interface IUserDataAftorization {
  email: string;
  name: string;
  password: string;
  status?: "idle" | "loading" | "failed";
}
