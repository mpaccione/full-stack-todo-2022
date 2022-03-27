import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import darkIcon from './icon-moon.svg'
import lightIcon from './icon-sun.svg'

const Icon = styled.img`
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    height: 40px;
    width: 40px;
`

const Row = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;


    h1 {
        color: white;
        font-size: 3em;
        letter-spacing: 0.5em;
    }
`

const Header = ({ setTheme }) => {
    const theme = useSelector(state => state.settings.theme)

    return (
        <Row>
            <h1>TODO</h1>
            <Icon
                src={ theme === 'dark' ? darkIcon : lightIcon } 
                onClick={() => { theme === 'dark' ? setTheme('light') : setTheme('dark') }} 
            />
        </Row>
    )
}

export default Header