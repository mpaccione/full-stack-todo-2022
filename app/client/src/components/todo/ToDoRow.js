import React from 'react'
import { TableRow, TableCell } from "@mui/material"
import styled from "styled-components"

import check from "./icon-check.svg"

const CompletedCell = styled(TableCell)`
    width: 60px !important;
`

const CompletedToggle = styled.div`
    border: 1px solid lightgray;
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    overflow: hidden;
    position: relative;
    width: 30px;

    &.completed {
        background-color: purple;

        img {
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translateX(-50%) translateY(-50%)
        }
    }
`

const DescriptionCell = styled(TableCell)`
    font-weight: bold;

    &.completed {
        font-weight: normal;
        opacity: 0.4;
        text-decoration: line-through;
    }
`

const StyledRow = styled(TableRow)`
    background-color: white !important;
    height: 35px;
    padding: 15px 0px;
`

const ToDoRow = ({ completed, description, id, updateTodoList }) => {

    return (
        <StyledRow key={id}>
            <CompletedCell>
                <CompletedToggle 
                    className={completed ? 'completed' : ''} 
                    onClick={() => { updateTodoList({ completed, description, id }) }}
                >
                    {completed && <img src={check} alt="Complete" />}
                </CompletedToggle>
            </CompletedCell>
            <DescriptionCell className={completed ? 'completed' : ''}>{description}</DescriptionCell>
        </StyledRow>
    )
}

export default ToDoRow