import React from "react";

import { Routes, Route } from "react-router-dom";

import "./zero.scss";
import "./App.scss";
import { HelloPage } from "./pages/HelloPage/HelloPage";

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

function App() {
  return (
    <React.Suspense
      fallback={
        <article className="wrapper-loader">
          <div className="lds-roller">
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
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/hello" element={<HelloPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
