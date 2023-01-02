import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "./LoginPage";
test("LoginPage is working", () => {
  render(<LoginPage />);
  const lorem = screen.getByText(/lorem/i);
  expect(lorem).toBeInTheDocument();
});
