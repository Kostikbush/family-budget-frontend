import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";

import logo from "../../assets/img/logo-app.jpg";
import "./headerInfo.scss";
import { styleBgIcons } from "../../Common-Style/colorsBgIconHeader";
import { ChangeBgHeader } from "../../CONST/CONST";
import { changeBgHeader } from "../../helpersFunc/changeBgHeadre";

export const HeaderInfo = () => {
  const [styleHeader, setStyleHader] = useState<string>(ChangeBgHeader.HOME);
  const location = useLocation();

  useEffect(() => {
    changeBgHeader(location.pathname, setStyleHader);
  }, [location.pathname]);
  return (
    <header className={`${styleHeader}  app-header`}>
      <ul className="app-header__list">
        <li className="app-header-list__item">
          <img height={40} width={40} src={logo} alt="LOGOIMAGE" />
        </li>
        <li className="app-header-list__item header-list__icon">
          {location.pathname === "/home" && (
            <span
              style={styleBgIcons.home}
              className="app-header-list-item__icon"
            >
              <AiOutlineHome color="#fff" size={20} />
            </span>
          )}
          {location.pathname === "/home/createBudget" && (
            <span
              style={styleBgIcons.createBudget}
              className="app-header-list-item__icon"
            >
              <GiWallet color="#fff" size={20} />
            </span>
          )}
        </li>
      </ul>
    </header>
  );
};
