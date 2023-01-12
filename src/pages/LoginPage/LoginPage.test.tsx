import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import "fake-indexeddb/auto";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { LoginPage } from "./LoginPage";
test("LoginPage is working", () => {
  render(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
  const enter = screen.getByText(/вход/i);
  expect(enter).toBeInTheDocument();
});
