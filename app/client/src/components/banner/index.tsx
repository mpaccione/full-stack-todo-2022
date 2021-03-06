import React from 'react'
import styled from 'styled-components'

import { useAppSelector } from '../../redux/hooks'
import dLight from './bg-desktop-light.jpg'
import dDark from './bg-desktop-dark.jpg'
import mLight from './bg-mobile-light.jpg'
import mDark from './bg-mobile-dark.jpg'

const Background = styled.div`
    background-color: violet;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: 1s all;
    width: 100%;

    ${props => props.theme.mobile ? `height: 205px` : `height: 300px`}
`

const Banner = () => {
    const { mobile, theme } = useAppSelector(state => state.settings)
    let img;
    
    if (mobile) {
        img = theme === 'dark' ? mDark : mLight
    } else {
        img = theme === 'dark' ? dDark : dLight
    }


    return <Background style={{ backgroundImage: `url(${img})` }} />
}

export default Banner