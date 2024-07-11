import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should dispatch authLogin", () => {
    const email = "email";
    const password = "password";
    const checked = true;

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    const passwordInput = screen.getByPlaceholderText(/123456/i);

    const checkInput = screen.getByRole("checkbox", {
      name: /stay logged in/i,
    });
    const submitButton = screen.getByRole("button", {
      name: /log in/i,
    });
    expect(submitButton).toHaveProperty("disabled", true);

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(checkInput, { target: { value: checked } });

    expect(submitButton).toHaveProperty("disabled", false);

    fireEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledOnce;
    expect(authLogin).toHaveBeenCalledWith({ email, password }, checked);
  });
});
