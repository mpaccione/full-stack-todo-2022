import React from 'react'
import { TableRow, TableCell } from "@mui/material"
import styled from "styled-components"

import { ToDo } from '../../shared/types'
import cancel from "./icon-cross.svg"
import check from "./icon-check.svg"

const CompletedCell = styled(TableCell)`
    border-bottom: none !important;
    width: 25px !important;

    ${props => props.theme.mobile ? `padding-right: 0px !important` : ``};
`

const CompletedToggle = styled.div`
    border: 1px solid ${props => props.theme.theme === 'dark' ? props.theme.color6 : props.theme.color2};
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    ${props => props.theme.mobile ?
        `
        height: 20px;
        width: 20px;    
    ` :
        `
        height: 30px;
        width: 30px;
    `}

    &.completed {
        background: ${props => props.theme.primaryGradient};

        img {
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translateX(-50%) translateY(-50%)
        }
    }
`

const DescriptionCell = styled(TableCell)`
    border-bottom: none !important;
    color: ${props => props.theme.theme === 'dark' ? props.theme.color3 : props.theme.color5} !important;
    font-size: ${props => props.theme.mobile ? '0.8em' : '1em'} !important;
    font-weight: bold;
    vertical-align: bottom !important;

    &.completed {
        font-weight: normal;
        opacity: 0.4;
        text-decoration: line-through;
    }
`

const RemoveCell = styled(TableCell)`
    border-bottom: none !important;

    img {
        cursor: pointer;
        float: right;
        opacity: 0.8;
        padding-right: 15px;
        transition: 0.25s all;
        vertical-align: middle !important;

        ${props => props.theme.mobile && `
            height: 13px;
            padding-right: 5px;
            width: 13px;
        `}

        &:hover {
            opacity: 1;
        }
    }
`

const StyledRow = styled(TableRow)`
    height: 35px;

    ${props => props.theme.theme === 'dark' ?
    `
        background-color: ${props.theme.color2} !important;
        border-bottom: 1px solid ${props.theme.color7} !important;
    ` :
    `
        background-color: white !important;
    `}

    ${props => props.theme.mobile ? `padding: 5px 0px;` : `padding: 15px 0px;`}
`

const ToDoRow = (
    { completed, description, id, removeTodo, updateTodoList }: 
    { completed:boolean, description:string, id:string, removeTodo:Function, updateTodoList:Function }
) => (
    <StyledRow>
        <CompletedCell>
            <CompletedToggle
                className={completed ? 'completed' : ''}
                onClick={() => { updateTodoList({ completed: !completed, description, id }) }}
            >
                {completed && <img src={check} alt="Complete" />}
            </CompletedToggle>
        </CompletedCell>
        <DescriptionCell className={completed ? 'completed' : ''}>{description}</DescriptionCell>
        <RemoveCell>
            <img src={cancel} alt="Remove" onClick={() => { removeTodo((t: ToDo) => t.id !== id) }} />
        </RemoveCell>
    </StyledRow>
)


export default ToDoRow