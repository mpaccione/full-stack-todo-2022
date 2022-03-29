import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { Banner, Header, ToDoForm } from './components'
import { setMobile } from './redux/settingsSlice';
import themeObj from './theme.js'

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
  `
}`

function App() {
  const { mobile, theme } = useSelector(state => state.settings)
  const dispatch = useDispatch()

  const activeTheme = themeObj[theme] 

  activeTheme.mobile = mobile
  activeTheme.theme = theme

  useEffect(() => {
    // TODO: add throttle for mobile
    dispatch(setMobile(window.innerWidth < 768 ? true : false))
  }, [window.innerWidth])

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
