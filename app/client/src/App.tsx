import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Banner, Header, ToDoForm } from './components'
import { setMobile } from './redux/settingsSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import themeObj from './theme'

const Body = styled.div`
  background-color: ${props => props.theme.color1};
  height: 100%;
  position: relative;
  width: 100%;
`

const Container = styled.div`
  position: absolute;
  top: 0px;

  ${props => props.theme.mobile ?
    `
    left: 5%;
    padding-top: 15px;
    width: 90%;
  ` :
    `
    left: 50%;
    padding-top: 50px;
    transform: translateX(-50%);
    width: 720px;
  `}`

function App() {
  const { mobile, theme } = useAppSelector(state => state.settings)
  const dispatch = useAppDispatch()

  const activeTheme = { mobile, theme, ...themeObj[theme as keyof object] as {} }

  useEffect(() => {
    window.addEventListener("resize", function () {
      dispatch(setMobile(window.innerWidth < 768 ? true : false))
    }, false)
  }, [])

  return (
    <ThemeProvider theme={activeTheme}>
      <Body>
        <Banner />
        <Container>
          <Header />
          <ToDoForm />
        </Container>
      </Body>
    </ThemeProvider>
  );
}

export default App;
