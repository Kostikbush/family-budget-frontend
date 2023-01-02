import React, { useEffect, useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import "./zero.css";
import "./App.scss";
import { useAppSelectore } from "./hooks/redux";

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
  //const navigation = useNavigate();
  //const {} = useAppSelectore(state => state.)

  return (
    <>
      <React.Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
