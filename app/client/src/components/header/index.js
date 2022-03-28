import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../redux/settingsSlice'
import styled from 'styled-components'

import darkIcon from './icon-moon.svg'
import lightIcon from './icon-sun.svg'

const Icon = styled.img`
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;

    ${props => props.theme.mobile ? 
    `
        height: 25px;
        width: 25px;
    ` : 
    `
        height: 40px;
        width: 40px;
    `}
`

const Row = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h1 {
        color: white;
        font-weight: bold;

        ${props => props.theme.mobile ? 
        `
            font-size: 2em;
            letter-spacing: 0.3em;
        ` : 
        `
            font-size: 3em;
            letter-spacing: 0.5em;
        `}
    }
`

const Header = () => {
    const theme = useSelector(state => state.settings.theme)
    const dispatch = useDispatch()

    return (
        <Row>
            <h1>TODO</h1>
            <Icon
                src={ theme === 'dark' ? lightIcon : darkIcon } 
                onClick={() => { theme === 'dark' ? dispatch(setTheme('light')) : dispatch(setTheme('dark')) }} 
            />
        </Row>
    )
}

export default Header