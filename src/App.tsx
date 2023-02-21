/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { NavMenu } from "./Components/NavMenu/NavMenu";
import { HelloPage } from "./pages/HelloPage/HelloPage";

import "./zero.scss";
import "./App.scss";
import { HeaderInfo } from "./Components/HeaderInfo/HeaderInfo";
import { Alert } from "./UI/Alert/Alert";

const HomePage = React.lazy(() =>
  import("./pages/HomePage/HomePage").then(({ HomePage }) => ({
    default: HomePage,
  }))
);
const LoginPage = React.lazy(() =>
  import("./pages/LoginPage/LoginPage").then(({ LoginPage }) => ({
    default: LoginPage,
  }))
);
const AimPage = React.lazy(() =>
  import("./pages/AimPage/AimPage").then(({ AimPage }) => ({
    default: AimPage,
  }))
);
const StatPage = React.lazy(() =>
  import("./pages/StatPage/StatPage").then(({ StatPage }) => ({
    default: StatPage,
  }))
);
const IncomsPage = React.lazy(() =>
  import("./pages/IncomsPage/Incoms").then(({ IncomsPage }) => ({
    default: IncomsPage,
  }))
);
const ExpensPage = React.lazy(() =>
  import("./pages/ExpensPage/ExpensPage").then(({ ExpensPage }) => ({
    default: ExpensPage,
  }))
);
const ChatPage = React.lazy(() =>
  import("./pages/ChatPage/ChatPage").then(({ ChatPage }) => ({
    default: ChatPage,
  }))
);
const AccountPage = React.lazy(() =>
  import("./pages/AccountPage/AccountPage").then(({ AccountPage }) => ({
    default: AccountPage,
  }))
);
const CreateBudgetPage = React.lazy(() =>
  import("./pages/CreateBudgetPage/CreateBudgetPage").then(
    ({ CreateBudgetPage }) => ({
      default: CreateBudgetPage,
    })
  )
);
const CommentPage = React.lazy(() =>
  import("./pages/CommentPage/CommentPage").then(({ CommentPage }) => ({
    default: CommentPage,
  }))
);
const routes = [
  {
    path: "/",
    name: "App",
    element: <App />,
    nodeRef: createRef(),
  },
  {
    path: "/login",
    name: "Login",
    element: <LoginPage />,
    nodeRef: createRef(),
  },
  {
    path: "/hello",
    name: "Hello",
    element: <HelloPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home",
    name: "Home",
    element: <HomePage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/stat",
    name: "Stat",
    element: <StatPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/aim",
    name: "Aim",
    element: <AimPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/settingIncoms",
    name: "Incoms",
    element: <IncomsPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/settingExpens",
    name: "Expens",
    element: <ExpensPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/chat",
    name: "Chat",
    element: <ChatPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/account",
    name: "Account",
    element: <AccountPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/account",
    name: "Account",
    element: <AccountPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/createBudget",
    name: "CreateBudgetPage",
    element: <CreateBudgetPage />,
    nodeRef: createRef(),
  },
  {
    path: "/home/comment",
    name: "CommentPage",
    element: <CommentPage />,
    nodeRef: createRef(),
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => ({
      key: route.path,
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function App() {
  const [vieInfo, setVieInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  useMemo(() => {}, []);
  useEffect(() => {
    navigate("/login");
  }, []);
  const handleOver = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <section onDragOver={(e) => handleOver(e)} onDrag={(e) => handleOver(e)}>
      {location.pathname !== "/" &&
        location.pathname !== "/hello" &&
        location.pathname !== "/login" && (
          <HeaderInfo setVieInfo={setVieInfo} />
        )}
      {location.pathname !== "/" &&
        location.pathname !== "/hello" &&
        location.pathname !== "/login" && <NavMenu />}
      <>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
            timeout={300}
            classNames="pagese"
            unmountOnExit
          >
            {(state) => (
              <React.Suspense
                fallback={
                  <article className="app__wrapper-loader">
                    <div className="app__lds-roller">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </article>
                }
              >
                <div
                  className={
                    vieInfo
                      ? "app__wrapper-page page-blur"
                      : "app__wrapper-page"
                  }
                  ref={nodeRef as React.RefObject<HTMLDivElement>}
                >
                  {currentOutlet}
                </div>
              </React.Suspense>
            )}
          </CSSTransition>
        </SwitchTransition>
      </>
      {vieInfo && (
        <Alert handleValue={setVieInfo} type={"alert"} value={vieInfo}>
          <article className="app-header-list-blockInfo">
            <p className="app-header-list-blockInfo__text">
              Это приложение было создано для внедрения в семейные пары
              контракта, который бы смог снизить к нулю распри на тему финансов.
              Для корректной работы приложения придётся вписывать все движения
              ваших общих финансов. Даже если вы практикуете личные раздельные
              расходы, то укажите их как отдельную статью расходов. Обязательно
              указывайте каждое изменение чтоб приложение могло вовремя
              отреагировать на недопустимые расходы! Приятного использования.
            </p>
          </article>
        </Alert>
      )}
    </section>
  );
}
