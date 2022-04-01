import React from 'react'
import { Card } from "@mui/material"
import styled from 'styled-components'

import { CompletedToggle } from './ToDoRow'

const InputContainer = styled(Card)`
    align-content: center;
    box-shadow: none !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;

    background-color: ${props => props.theme.theme === 'dark' ? props.theme.color2 : 'white'} !important;

    ${props => props.theme.mobile ?
        `   margin-top: 10px;
        padding: 10px 0px; 
        height: 30px;
    ` :
        `   padding: 15px 0px; 
        height: 35px;
    `
    }
`

const StyledInput = styled.input`
    border: none;
    font-size: 1em;
    margin-left: 15px;
    outline: none !important;
    width: 100%;

    ${props => props.theme.theme === 'dark' ?
        `   color: ${props.theme.color3};
        background-color: ${props.theme.color2};
    ` :
        `   color: ${props.theme.color5};
        background-color: 'white';
    `};
`


const ToDoInput = ({ 
    addTodo, 
    inputVal, 
    setInputVal 
} : { 
    addTodo: Function, 
    inputVal: string, 
    setInputVal: Function 
}) => (
    <InputContainer>
        <CompletedToggle style={{ cursor: "default", margin: "0px 16px" }} />
        <StyledInput
            onChange={(e) => { setInputVal(e.target.value) }}
            onKeyPress={(e) => { e.key === 'Enter' && addTodo() }}
            placeholder="Create a new todo..."
            type="text"
            value={inputVal}
        />
    </InputContainer>
)

export default ToDoInput