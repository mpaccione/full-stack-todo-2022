import { render } from "@testing-library/react";

import { setMobile, setTheme } from "../redux/settingsSlice";
import { ReduxProvider } from "./utils";
import Banner from "../components/banner/index";
import store from "../redux/store"

test("test banner states", () => {
  let { mobile, theme } = store.getState().settings

  expect(mobile).toEqual(false)
  expect(theme).toEqual("light")

  const { container, rerender } = render(
    <ReduxProvider>
      <Banner />
    </ReduxProvider>
  );
  const bg = container.querySelector('div');

  // start in light theme on desktop
  expect(bg.style.backgroundImage).toEqual('url(bg-desktop-light.jpg)')
  store.dispatch(setTheme("dark"))

  rerender(
    <ReduxProvider>
      <Banner />
    </ReduxProvider>
  );

  // now in dark theme on desktop
  expect(bg.style.backgroundImage).toEqual('url(bg-desktop-dark.jpg)')
  store.dispatch(setMobile(true))
  store.dispatch(setTheme("light"))

  rerender(
    <ReduxProvider>
      <Banner />
    </ReduxProvider>
  );

  // now in light theme on mobile
  expect(bg.style.backgroundImage).toEqual('url(bg-mobile-light.jpg)')
  store.dispatch(setTheme("dark"))
 
  rerender(
    <ReduxProvider>
      <Banner />
    </ReduxProvider>
  );

  // now in dark theme on mobile
  expect(bg.style.backgroundImage).toEqual('url(bg-mobile-dark.jpg)')
});