import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import LoginPage from "../Login";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { authLogin } from "../../../store/actions";

vi.mock("../../../store/actions");

describe("LoginPage", () => {
  const state = { ui: { pending: false, error: null } };
  const store = {
    dispatch: () => {},
    getState: () => state,
    subscribe: () => {},
  };
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch authLogin action"),
    () => {
      const email = "email";
      const password = "password";
      const checked = "checked";

      const emailInput = screen.getByRole("textbox", {
        name: /email/i,
      });
      const passwordInput = screen.getByText(/password/i);
      const checkInput = screen.getByRole("checkbox", {
        name: /stay logged in/i,
      });
      const submitButton = screen.getByRole("button", {
        name: /log in/i,
      });
      expect(submitButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.click(checkInput, { target: { value: checked } });

      expect(submitButton).toBeEnabled();

      fireEvent.click(submitButton);

      expect(authLogin).toHaveBeenCalledWith({email, password}, checked)

    };
});
