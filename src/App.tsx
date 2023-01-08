import React from "react";
import { Routes, Route } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import "./zero.css";
import "./App.scss";

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
  return (
    <React.Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
