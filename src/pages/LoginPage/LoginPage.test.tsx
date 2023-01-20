import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  test("Click to btn change form", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    //const btnChangeForm = screen.getByTestId("btn-testCgangeForm");
    const inpyutForm = screen.getByPlaceholderText(/Введите email/i);

    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    userEvent.type(inpyutForm, "Konstantin");
    //expect(btnChangeForm).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите email")).toContainHTML(
      "Konstantin"
    );

    await userEvent.click(screen.getByTestId("btn-testCgangeForm"));
    const newH2 = await screen.findByTestId(/h2-registration/i);
    expect(newH2).toContainHTML("Регистрация");
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });
});
