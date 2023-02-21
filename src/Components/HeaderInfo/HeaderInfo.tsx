/* eslint-disable jsx-a11y/img-redundant-alt */
import { useMemo, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineAim, AiOutlineHome } from "react-icons/ai";
import { GiExpense, GiWallet } from "react-icons/gi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { ImStatsDots } from "react-icons/im";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { TfiCommentsSmiley } from "react-icons/tfi";

import "./headerInfo.scss";
import logo from "../../assets/img/logo-app.jpg";
import { styleBgIcons } from "../../Common-Style/colorsBgIconHeader";
import { useAppSelectore } from "../../hooks/redux";
interface headerProps {
  setVieInfo: Function;
}
export const HeaderInfo = ({ setVieInfo }: headerProps) => {
  const location = useLocation();
  const [isExitImage, setIsExitImage] = useState(false);
  const [locationPath, setLocationPath] = useState(location.pathname);
  const authData = useAppSelectore((state) => state.ayth);
  useMemo(() => {
    setIsExitImage(true);
    setTimeout(() => {
      setIsExitImage(false);
    }, 300);
    setTimeout(() => {
      setLocationPath(location.pathname);
    }, 300);
  }, [location.pathname]);
  //console.log(authData.image === "");
  return (
    <header className="app-header">
      <ul className="app-header__list">
        <li className="app-header-list__item">
          <a href="https://site-portfolio-pw0840fy4-kostikbush.vercel.app">
            <img height={40} width={40} src={logo} alt="LOGOIMAGE" />
            <span className="app-header-list-item__logo">
              KOT-BUSH
              <br />
              APP
            </span>
          </a>
        </li>

        <li className="app-header-list__item app-header-list__icon">
          {locationPath === "/home" && (
            <span
              style={styleBgIcons.home}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <AiOutlineHome color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/createBudget" && (
            <span
              style={styleBgIcons.createBudget}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <GiWallet color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/account" && (
            <span
              style={styleBgIcons.account}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <RiAccountPinCircleLine color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/stat" && (
            <span
              style={styleBgIcons.stat}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <ImStatsDots color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/aim" && (
            <span
              style={styleBgIcons.aim}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <AiOutlineAim color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/settingIncoms" && (
            <span
              style={styleBgIcons.incoms}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <MdOutlineAttachMoney color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/settingExpens" && (
            <span
              style={styleBgIcons.expens}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <GiExpense color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/chat" && (
            <span
              style={styleBgIcons.chat}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <BsFillChatSquareTextFill color="#fff" size={20} />
            </span>
          )}
          {locationPath === "/home/comment" && (
            <span
              style={styleBgIcons.comment}
              className={
                isExitImage
                  ? "app-header-list-item__icon-exit"
                  : "app-header-list-item__icon"
              }
            >
              <TfiCommentsSmiley color="#fff" size={20} />
            </span>
          )}
        </li>
        <li className="app-header-list__item app-header-list__img">
          {authData.avatar !== "" ? (
            <img
              width={60}
              height={60}
              src={`data:image/svg+xml,${encodeURIComponent(authData.avatar)}`}
              alt="SVG Image"
            />
          ) : (
            <span className="app-header-list-item__name">
              {authData.name.slice(0, 1)}
            </span>
          )}
        </li>
        <li
          onClick={() => setVieInfo(true)}
          className="app-header-list__item app-header-list__question"
        >
          <AiOutlineQuestionCircle color="#fff" size={40} />
        </li>
      </ul>
    </header>
  );
};
