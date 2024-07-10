import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LoginPage from "../Login";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

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
});