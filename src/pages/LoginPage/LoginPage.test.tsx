import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./LoginPage";
test("LoginPage is working", () => {
  render(<LoginPage />);
  const enter = screen.getByText(/вход/i);
  expect(enter).toBeInTheDocument();
});
