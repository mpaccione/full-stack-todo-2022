import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReduxProvider } from "./utils";
import Header from "../components/header/index";
import store from "../redux/store"

test("test theme button toggle", () => {
  let themeState = store.getState().settings.theme

  const { container, rerender } = render(
    <ReduxProvider>
      <Header />
    </ReduxProvider>
  );
  const icon = container.querySelector('img');

  // start in light theme
  expect(icon.getAttribute('src')).toContain('icon-moon.svg');
  expect(themeState).toEqual("light")

  userEvent.click(icon);
  themeState = store.getState().settings.theme

  rerender(
    <ReduxProvider>
      <Header />
    </ReduxProvider>
  );

  // now in dark theme
  expect(icon.getAttribute('src')).toContain('icon-sun.svg');
  expect(themeState).toEqual("dark")
});