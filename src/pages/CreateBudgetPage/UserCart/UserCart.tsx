import { useMemo, useState } from "react";
import { ISearchUser } from "../../../models/IUser";
import "./userCart.scss";
interface Props {
  user: ISearchUser;
  handleClick: Function;
  isResetActive: boolean;
}

export const UserCart = ({ user, handleClick, isResetActive }: Props) => {
  const [activeUser, setActiveUser] = useState(false);
  const handleClickChange = () => {
    setActiveUser(!activeUser);
    handleClick(user.email);
  };
  useMemo(() => {
    isResetActive && setActiveUser(false);
  }, [isResetActive]);

  return (
    <li
      onClick={handleClickChange}
      className={activeUser ? "userCart-wrapper-active" : "userCart-wrapper"}
    >
      <span className="userCart-wrapper__name">{user.name}</span>
      <span className="userCart-wrapper__email">{user.email}</span>
    </li>
  );
};
