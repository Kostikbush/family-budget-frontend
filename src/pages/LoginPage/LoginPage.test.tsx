import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import "fake-indexeddb/auto";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import { LoginPage } from "./LoginPage";
describe("Test Login Page", () => {
  test("LoginPage vie", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    const enter = screen.getByText(/вход/i);
    const input = screen.getByPlaceholderText(/Введите email/i);
    expect(enter).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  test("Click to btn change form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    const btnChangForm = screen.getByText("Регистрация");
    expect(btnChangForm).toBeInTheDocument();
  });
});
