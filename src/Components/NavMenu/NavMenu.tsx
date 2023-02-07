import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { ImStatsDots } from "react-icons/im";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiOutlineAim } from "react-icons/ai";
import { GiExpense } from "react-icons/gi";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";

import "./navMenu.scss";

const routes = [
  {
    key: 1,
    lingWay: "/home/stat",
    contentText: "Статистика",
    img: <ImStatsDots size={20} color="white" />,
    style: "link link-color-stat",
    styleActive: "active-link-stat link link-color-stat",
    styleContent: "link-content link-content-stat",
  },
  {
    key: 2,
    lingWay: "/home/aim",
    contentText: "Цели",
    img: <AiOutlineAim size={20} color="white" />,
    style: "link link-color-aim",
    styleActive: "active-link-aim link link-color-aim",
    styleContent: "link-content link-content-aim",
  },
  {
    key: 3,
    lingWay: "/home/settingIncoms",
    contentText: "Управление доходами",
    img: <MdOutlineAttachMoney size={20} color="white" />,
    style: "link link-color-incom",
    styleActive: "active-link-incom link link-color-incom",
    styleContent: "link-content link-content-incom",
  },
  {
    key: 4,
    lingWay: "/home/settingExpens",
    contentText: "Управление расходами",
    img: <GiExpense size={22} color="white" />,
    style: "link link-color-expens",
    styleActive: "active-link-expens link link-color-expens",
    styleContent: "link-content link-content-expens",
  },
  {
    key: 5,
    lingWay: "/home/chat",
    contentText: "Чат",
    img: <BsFillChatSquareTextFill size={22} color="white" />,
    style: "link link-color-chat",
    styleActive: "active-link-chat link link-color-chat",
    styleContent: "link-content link-content-chat",
  },
];
//interface navMenuProps {}

export const NavMenu = () => {
  const [isBudget, setIsBudget] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsBudget(false);
  }, []);
  return (
    <section className="app-nav__wrapper">
      <nav className="app-nav-menu">
        <>
          <NavLink
            key={22}
            className={
              location.pathname === "/home"
                ? `active-link-home link link-color-home`
                : "link link-color-home"
            }
            to={"/home"}
          >
            <div className="link-content link-content-home">
              <AiOutlineHome size={20} color="white" />
              <span>Главная</span>
            </div>
          </NavLink>
          <NavLink
            key={26}
            className={
              location.pathname === "/home/createBudget"
                ? `active-link-createBudget link link-color-createBudget`
                : "link link-color-createBudget"
            }
            to={"/home/createBudget"}
          >
            <div className="link-content link-content-createBudget">
              <GiWallet size={20} color="white" />
              <span>Создать бюджет</span>
            </div>
          </NavLink>
          {routes.map((link) => (
            <>
              {isBudget ? (
                <NavLink
                  key={link.key}
                  className={({ isActive }) =>
                    isActive ? `${link.styleActive}` : "link link-color-stat"
                  }
                  to={link.lingWay}
                >
                  <div className={link.styleContent}>
                    {link.img}
                    <span>{link.contentText}</span>
                  </div>
                </NavLink>
              ) : (
                <button key={link.lingWay} className="link have-not-budget">
                  <div className={link.styleContent}>
                    {link.img}
                    <span>{link.contentText}</span>
                  </div>
                </button>
              )}
            </>
          ))}
          <NavLink
            key={90}
            className={
              location.pathname === "/home/account"
                ? `active-link-account link link-color-account`
                : "link link-color-account"
            }
            to={"/home/account"}
          >
            <div className="link-content link-content-account">
              <RiAccountPinCircleLine size={20} color="white" />
              <span>Аккаунт</span>
            </div>
          </NavLink>
        </>
      </nav>
    </section>
  );
};
