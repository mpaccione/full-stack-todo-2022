import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import dLight from './bg-desktop-light.jpg'
import dDark from './bg-desktop-dark.jpg'
import mLight from './bg-mobile-light.jpg'
import mDark from './bg-mobile-dark.jpg'

const Background = styled.div`
    background-color: violet;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 300px;
    width: 100%;
`

const Banner = () => {
    const { mobile, theme } = useSelector(state => state.settings)
    let img;
    
    if (mobile) {
        img = theme === 'dark' ? mDark : mLight
    } else {
        img = theme === 'dark' ? dDark : dLight
    }


    return <Background style={{ backgroundImage: `url(${img})` }} />
}

export default Banner