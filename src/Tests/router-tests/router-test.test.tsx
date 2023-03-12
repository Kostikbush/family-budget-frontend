import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "fake-indexeddb/auto";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "../../App";
import { UserObject } from "../../models/IUser";
//import axios from "axios";
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/prefer-screen-queries */

describe("Router tets and vie pages", () => {
  jest.mock("axios");
  let respons: UserObject;
  respons = {
    user: {
      id: "63fa44f6d8bae8f295f306bc",
      email: "testUser@yundex.ru",
      password: "123456789987654321",
      name: "testUser",
      isActivated: false,
      activationLink: "0f016235-0804-4da6-a3d1-45ea43fe85a6",
      avatar: "",
      isSetComment: false,
      alert: [],
      __v: 0,
      budget: null,
      chat: null,
    },
  };
  test("Change pages", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      );
    });
    const inputEmail = await screen.findByPlaceholderText(/Введите email/i);
    expect(inputEmail).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    const inputPass = await screen.findByPlaceholderText(/Введите пароль/i);
    expect(inputPass).toBeInTheDocument();
    await userEvent.tab();
    await act(async () => {
      await userEvent.type(inputEmail, "testUser@yundex.ru");
    });
    await act(async () => {
      await userEvent.type(inputPass, "123456789987654321");
    });

    const btnEnter = await screen.findByTestId(/button-enter/i);
    expect(btnEnter).toBeInTheDocument();
    await userEvent.click(btnEnter);
    //(axios.get as jest.Mock).mockResolvedValue(respons);

    await act(async () => {
      jest.setTimeout(5000);
    });
    console.log(respons);
    // await waitFor(() => {
    //   const helloUser = screen.queryByText("Добрый день testUser!");
    //   expect(helloUser).toBeInTheDocument();
    // });
    screen.debug();
  });
});
