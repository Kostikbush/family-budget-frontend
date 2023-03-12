/* eslint-disable react-hooks/exhaustive-deps */
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
import { AiOutlineLine } from "react-icons/ai";
import { TfiCommentsSmiley } from "react-icons/tfi";

import "./navMenu.scss";
import { useGetBudgetMutation } from "../../service/budgetApi";
import { useAppSelectore } from "../../hooks/redux";
import { moveEndAndStart, moveItem, moveThone } from "./helpersFunc/moveItem";
import { IndicateNewMessage } from "./IndicateNewMessage";

const routes = [
  {
    lingWay: "/home/stat",
    contentText: "Статистика",
    img: <ImStatsDots className="link-svg" size={20} color="white" />,
    style: "link link-color-stat",
    styleActive: "active-link-stat link link-color-stat",
    styleContent: "link-content link-content-stat",
  },
  {
    lingWay: "/home/aim",
    contentText: "Цели",
    img: <AiOutlineAim className="link-svg" size={20} color="white" />,
    style: "link link-color-aim",
    styleActive: "active-link-aim link link-color-aim",
    styleContent: "link-content link-content-aim",
  },
  {
    lingWay: "/home/settingIncoms",
    contentText: "Управление доходами",
    img: <MdOutlineAttachMoney className="link-svg" size={20} color="white" />,
    style: "link link-color-incom",
    styleActive: "active-link-incom link link-color-incom",
    styleContent: "link-content link-content-incom",
  },
  {
    lingWay: "/home/settingExpens",
    contentText: "Управление расходами",
    img: <GiExpense className="link-svg" size={22} color="white" />,
    style: "link link-color-expens",
    styleActive: "active-link-expens link link-color-expens",
    styleContent: "link-content link-content-expens",
  },
  {
    lingWay: "/home/chat",
    contentText: "Чат",
    img: (
      <BsFillChatSquareTextFill className="link-svg" size={22} color="white" />
    ),
    style: "link link-color-chat",
    styleActive: "active-link-chat link link-color-chat",
    styleContent: "link-content link-content-chat",
  },
];

export const NavMenu = () => {
  const [isDragDrop, setIsDragDrop] = useState(false);
  const [styleMoveNavMenu, setStyleMoveNavMenu] = useState({
    top: "2%",
    left: "1%",
  });
  const [activeMenu, setActiveMenu] = useState(false);
  const authData = useAppSelectore((state) => state.ayth);
  const [getBudget, { data }] = useGetBudgetMutation();
  const location = useLocation();
  useEffect(() => {
    getBudget({ email: authData.email });
  }, []);

  //className={isDragDrop ? "dis-none" : "dis-vei"}
  return (
    <article className={isDragDrop ? "dis-none" : "dis-vei"}>
      <section
        style={styleMoveNavMenu}
        draggable="true"
        onTouchStart={() => moveEndAndStart("start")}
        onTouchMove={(e) => moveThone(e, setStyleMoveNavMenu)}
        onTouchEnd={() => moveEndAndStart("end")}
        onDragLeave={(e) =>
          moveItem("left", e, setStyleMoveNavMenu, setIsDragDrop)
        }
        onDragEnd={(e) =>
          moveItem("end", e, setStyleMoveNavMenu, setIsDragDrop)
        }
        className={
          activeMenu ? "app-nav__wrapper" : "app-nav__wrapper-disabled"
        }
      >
        <nav className={activeMenu ? "app-nav-menu" : "app-nav-menu-disabled"}>
          <>
            <div
              onClick={() => setActiveMenu(!activeMenu)}
              className={
                activeMenu ? "nav-control" : "nav-control  nav-control-active"
              }
            >
              <AiOutlineLine
                height={4}
                color="white"
                className={
                  activeMenu
                    ? "nav-menu-line-one-active nuv-line"
                    : "nav-menu-line-one nuv-line"
                }
                // size={10}
              />
              <AiOutlineLine
                color="white"
                className={
                  activeMenu
                    ? "nav-menu-line-two-active nuv-line"
                    : "nav-menu-line-two nuv-line"
                }
                height={4}
                // size={10}
              />
              <AiOutlineLine
                height={4}
                color="white"
                className={
                  activeMenu
                    ? "nav-menu-line-three-active nuv-line"
                    : "nav-menu-line-three nuv-line"
                }
                // size={10}
              />
            </div>
            <div
              className={activeMenu ? "link-active link" : "link-disabled link"}
            >
              <NavLink
                className={
                  location.pathname === "/home"
                    ? `active-link-home link-color-home`
                    : "link-color-home"
                }
                to={"/home"}
              >
                <div className="link-content link-content-home">
                  <AiOutlineHome className="link-svg" size={20} color="white" />
                  <span>Главная</span>
                </div>
                <IndicateNewMessage
                  isVie={authData.alert.length > 0 ? true : false}
                />
              </NavLink>
            </div>
            {data ? null : (
              <div
                className={
                  activeMenu ? "link-active link" : "link-disabled link"
                }
              >
                <NavLink
                  className={
                    location.pathname === "/home/createBudget"
                      ? `active-link-createBudget link-color-createBudget`
                      : "link-color-createBudget"
                  }
                  to={"/home/createBudget"}
                >
                  <div className="link-content link-content-createBudget">
                    <GiWallet className="link-svg" size={20} color="white" />
                    <span>Создать бюджет</span>
                  </div>
                </NavLink>
              </div>
            )}
            {routes.map((link, i) => (
              <div
                className={
                  activeMenu ? "link-active link" : " link link-disabled"
                }
                key={i}
              >
                {data ? (
                  <NavLink
                    key={i}
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
                  <button
                    key={i + 20}
                    className={
                      activeMenu
                        ? "link have-not-budget link-active"
                        : "link have-not-budget link-disabled"
                    }
                  >
                    <div className={link.styleContent}>
                      {link.img}
                      <span>{link.contentText}</span>
                    </div>
                  </button>
                )}
              </div>
            ))}
            <div
              className={activeMenu ? "link-active link" : "link-disabled link"}
            >
              <NavLink
                className={
                  location.pathname === "/home/account"
                    ? `active-link-account link-color-account`
                    : "link-color-account"
                }
                to={"/home/account"}
              >
                <div className="link-content link-content-account">
                  <RiAccountPinCircleLine
                    className="link-svg"
                    size={20}
                    color="white"
                  />
                  <span>Аккаунт</span>
                </div>
              </NavLink>
            </div>
            <div
              className={activeMenu ? "link-active link" : "link-disabled link"}
            >
              <NavLink
                className={
                  location.pathname === "/home/comment"
                    ? `active-link-comment link-color-comment`
                    : "link-color-comment"
                }
                to={"/home/comment"}
              >
                <div className="link-content link-content-comment">
                  <TfiCommentsSmiley
                    className="link-svg"
                    size={20}
                    color="white"
                  />
                  <span>Оставить отзыв</span>
                </div>
              </NavLink>
            </div>
          </>
        </nav>
      </section>
    </article>
  );
};
