import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Banner, Header } from './components'
import themeObj from './theme.js'

const Container = styled.div`
  left: 50%;
  position: absolute;
  padding-top: 50px;
  top: 0px;
  transform: translateX(-50%);
  width: 720px;
`

function App() {
  const [mobile, setMobile] = useState(window.innerWidth < 768 ? 'mobile' : 'desktop')
  const [theme, setTheme] = useState('light')
  const activeTheme = themeObj[theme] 

  activeTheme.mobile = mobile
  activeTheme.theme = theme

  return (
    <ThemeProvider theme={activeTheme}>
      <div>
        <Banner />
        <Container>
          <Header setTheme={setTheme} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
