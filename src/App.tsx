/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { NavMenu } from "./Components/NavMenu/NavMenu";
import { HelloPage } from "./pages/HelloPage/HelloPage";

import "./zero.scss";
import "./App.scss";
import { HeaderInfo } from "./Components/HeaderInfo/HeaderInfo";
import { LoaderPage } from "./UI/LoaderPage/LoaderPage";
import { ConnectToWs } from "./Components/ConnectToWs/ConnectToWs";

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

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  useMemo(() => {}, []);
  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <section className="app" onDragOver={(e) => e.preventDefault()}>
      {location.pathname !== "/" &&
        location.pathname !== "/hello" &&
        location.pathname !== "/login" && <HeaderInfo />}
      {location.pathname !== "/" &&
        location.pathname !== "/hello" &&
        location.pathname !== "/login" && <NavMenu />}
      {location.pathname !== "/" &&
        location.pathname !== "/hello" &&
        location.pathname !== "/login" && <ConnectToWs />}
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
              <React.Suspense fallback={<LoaderPage />}>
                <div
                  className="app__wrapper-page"
                  ref={nodeRef as React.RefObject<HTMLDivElement>}
                >
                  {currentOutlet}
                </div>
              </React.Suspense>
            )}
          </CSSTransition>
        </SwitchTransition>
      </>
    </section>
  );
}
