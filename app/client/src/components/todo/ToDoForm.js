import React, { useEffect, useState } from 'react'
import { Card, Container, Table, TableBody } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { v4 as uuid } from "uuid"

import { ToDoRow } from './index'
import { getList, updateList } from './actions'

// shared styles
const menuStyles = `
    cursor: pointer;
    font-size: 0.85em;
    opacity: 0.4;
    transition: 0.25s all;

    &:hover {
        opacity: 1;
    }

    &.selected {
        color: blue;
        opacity: 1;
    }
`

// styled components
const InputContainer = styled(Card)`
    align-content: center;
    box-shadow: none !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;

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

const Instructions = styled.p`
    font-size: 0.85em;
    margin-top: 45px;    
    opacity: 0.4;
    text-align: center;
`

const Footer = styled.div`
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 15px 5px 15px;

    h3 { ${menuStyles} }

    h3:first-of-type {
        cursor: default !important;

        &:hover {
            opacity: 0.4 !important;
        }
    }
`

const MobileFooter = styled(Card)`
    box-shadow: none !important;
    display: flex;
    justify-content: center;
    margin-top: 15px;

    h3 { 
        ${menuStyles} 
        font-size: 1em;
        padding: 0px 10px;
    }
`

const StyledContainer = styled(Container)`
    padding: 0 !important;
`

const StyledInput = styled.input`
    border: none;
    font-size: 1em;
    margin-left: 15px;
    outline: none !important;
    width: 80%;
`

const Submit = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-right: 15px;
    opacity: 0.4;
    transition: 0.25s all;

    &:hover {
        opacity: 1;
    }
`

// NOTE: A user id would normally be sent to fetch all list id's
// Since we only have one list in this example the list id will be static
const listId = 'cabc437a-4ba0-4086-9d74-8b975febb936'
const fArr = ['All', 'Active', 'Completed']
const filterMap = {
    'Active': false,
    'Completed': true
}

const ToDoForm = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const [todos, setTodos] = useState([])
    const [filteredTodos, setFilteredTodos] = useState([])

    const dispatch = useDispatch()
    const mobile = useSelector(state => state.settings.mobile)

    useEffect(() => {
        getSavedList(uuid())
    }, [])

    useEffect(() => {
        if (todos) {
            filterTodos(todos)
        }
    }, [activeFilter, todos])

    // subcomponent
    const Filters = () => (
        <>
            {fArr.map((f, i) => (
                <h3 className={activeFilter === f ? 'selected' : ''} key={i} onClick={() => { setActiveFilter(f) }}>{f}</h3>
            ))}
        </>
    )

    // functions
    const addTodo = description => {
        const newTodo = {
            completed: false,
            description,
            id: uuid()
        }
        setTodos([...todos, newTodo])
    }

    const filterTodos = todos => {
        if (activeFilter === 'All') {
            return setFilteredTodos(todos)
        }

        setFilteredTodos(todos.filter(todo => todo.completed === filterMap[activeFilter]))
    }

    const setTodoState = todosRes => {
        if (todosRes) {
            setTodos(todosRes)
            filterTodos(todosRes)
        }
    }

    //////////
    // READ
    const getSavedList = async listId => {
        const todosRes = await dispatch(getList({ uuid: listId }))
        setTodoState(todosRes)
    }

    // DELETE
    const removeTodo = async condition => {
        // removes single and completed via dynamic filter param
        const remaining = todos.filter(todo => condition(todo))
        setTodos(remaining) // update client state first for fast UX
        const todosRes = await dispatch(updateList({ list: remaining, uuid: listId }))
        setTodoState(todosRes)
    }

    // UPDATE
    const updateTodoList = async updatedTodo => {
        const todosCopy = JSON.parse(JSON.stringify(todos));
        const index = todosCopy.findIndex(todo => todo.id === updatedTodo.id)

        if (index === -1) {
            return console.error('Cannot find todo index to update')
        }

        todosCopy[index] = updatedTodo

        setTodos(todosCopy) // update client state first for fast UX
        const todosRes = await dispatch(updateList({ list: todosCopy, uuid: listId }))
        setTodoState(todosRes)
    }

    return (
        <StyledContainer>
            <InputContainer>
                <StyledInput type="text" placeholder="Create a new todo..." />
                <Submit onClick={(e) => { addTodo(e.target.value) }}>Submit</Submit>
            </InputContainer>
            <Card style={{ boxShadow: '0px 15px 20px #ddd' }}>
                <Table>
                    <TableBody>
                        {filteredTodos.map(({ completed, description, id }, i) => (
                            <ToDoRow key={i} {...{ completed, description, id, removeTodo, updateTodoList }} />
                        ))}
                    </TableBody>
                </Table>
                <Footer>
                    {todos.length > 0 &&
                        <>
                            <h3>{todos.filter(todo => !todo.completed).length} items left</h3>
                            {!mobile && <Filters />}
                            <h3 onClick={() => {
                                removeTodo((t) => !t.completed)
                            }}>Clear Completed</h3>
                        </>
                    }
                </Footer>
            </Card>
            {mobile &&
                <MobileFooter>
                    <Filters />
                </MobileFooter>
            }
            <Instructions>Drag and drop to reorder list</Instructions>
        </StyledContainer>
    )
}

export default ToDoForm