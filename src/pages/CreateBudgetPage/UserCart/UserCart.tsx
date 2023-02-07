import { ISearchUser } from "../../../models/IUser";
import "./userCart.scss";
interface Props {
  user: ISearchUser;
}

export const UserCart = ({ user }: Props) => {
  return (
    <li className="userCart-wrapper">
      <span className="userCart-wrapper__name">{user.name}</span>
      <span className="userCart-wrapper__email">{user.email}</span>
    </li>
  );
};
