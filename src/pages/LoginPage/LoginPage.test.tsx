/* eslint-disable testing-library/no-unnecessary-act */
import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "fake-indexeddb/auto";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import { LoginPage } from "./LoginPage";
describe("Test Login Page", () => {
  test("LoginPage vie", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    jest.setTimeout(500);
    const input = await screen.findByPlaceholderText(/Введите email/i);
    const enter = await screen.findByText(/вход/i);
    expect(enter).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    const formEnter = screen.getByTestId("form-enter-snap");
    expect(formEnter).toBeInTheDocument();
    expect(formEnter).toMatchSnapshot();
  });
  test("Click to btn change form", async () => {
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      );
    });
    jest.setTimeout(500);
    const btnChangeForm = await screen.findByTestId("btn-testCgangeForm");
    const inputForm = screen.getByPlaceholderText(/Введите email/i);
    await act(async () => {
      await userEvent.type(inputForm, "Konstantin");
    });
    expect(btnChangeForm).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Введите email")).toContainHTML(
      "Konstantin"
    );
    await act(async () => {
      await userEvent.click(screen.getByTestId("btn-testCgangeForm"));
    });
    const newH2 = await screen.findByTestId(/h2-registration/i);
    expect(newH2).toContainHTML("Регистрация");
  });
});
