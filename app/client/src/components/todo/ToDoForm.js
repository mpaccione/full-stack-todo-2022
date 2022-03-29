import React, { useEffect, useState } from 'react'
import { Card, Container, Table, TableBody } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuid } from "uuid"
import styled from "styled-components"

import { ToDoRow } from './index'
import { createList, deleteList, getList, updateList } from './actions'
import theme from '../../theme'

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
        color: ${theme.primary.primary1};
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

const Instructions = styled.p`
    color: ${props => props.theme.theme === 'dark' ? props.theme.color3 : props.theme.color5} !important;
    font-size: 0.85em;
    margin-top: 45px;    
    opacity: 0.4;
    text-align: center;
`

const Footer = styled.div`
    color: ${props => props.theme.theme === 'dark' ? props.theme.color3 : props.theme.color5} !important;
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
    background-color: ${props => props.theme.theme === 'dark' ? props.theme.color2 : 'white'} !important;
    box-shadow: none !important;
    color: ${props => props.theme.theme === 'dark' ? props.theme.color3 : props.theme.color5} !important;
    display: flex;
    justify-content: center;
    margin-top: 15px;

    h3 { 
        ${menuStyles} 
        font-size: 1em;
        padding: 0px 10px;
    }
`

const StyledCard = styled(Card)`
    ${props => props.theme.theme === 'dark' ?
    `   background-color: ${props.theme.color2} !important;
        box-shadow: 0px ${props.theme.mobile ? '90px' : '35px'} 40px #111 !important;
    ` :
    `   background-color: white !important;
        box-shadow: 0px 15px 20px ${props.theme.color2} !important;
    `}
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

    ${props => props.theme.theme === 'dark' ?
    `   color: ${props.theme.color3};
        background-color: ${props.theme.color2};
    ` :
    `   color: ${props.theme.color5};
        background-color: 'white';
    `};
`

const Submit = styled.button`
    background-color: transparent;
    border: none;
    color: ${props => props.theme.theme === 'dark' ? props.theme.color3 : props.theme.color5};
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
    const [filteredTodos, setFilteredTodos] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [list, setList] = useState({})

    const dispatch = useDispatch()
    const mobile = useSelector(state => state.settings.mobile)

    useEffect(() => {
        getSavedList({ listId })
    }, [])

    useEffect(() => {
        if (list.items) {
            list.items.length ? filterList(list) : clearList(list) // if no items free up space (delete list)
        }
    }, [activeFilter, list])

    // subcomponent
    const Filters = () => (
        <>
            {fArr.map((f, i) => (
                <h3 className={activeFilter === f ? 'selected' : ''} key={i} onClick={() => { setActiveFilter(f) }}>{f}</h3>
            ))}
        </>
    )

    // functions
    const addTodo = async () => {
        const newTodo = {
            completed: false,
            description: inputVal,
            id: uuid()
        }

        setInputVal('')

        if (!list.items) {
            const todosRes = await dispatch(createList({ newTodo }))
            return setTodoState(todosRes)
        }

        updateTodoList(newTodo)
    }

    const filterList = list => {
        if (activeFilter === 'All') {
            return setFilteredTodos(list.items)
        }

        setFilteredTodos(list.items.filter(todo => todo.completed === filterMap[activeFilter]))
    }

    const setTodoState = todosRes => {
        todosRes && setList(todosRes)
        filterList(todosRes ? todosRes : list) // if api call failed revert state
    }

    //////////
    // READ
    const getSavedList = async listId => {
        const todosRes = await dispatch(getList(listId))
        setTodoState(todosRes)
    }

    // DELETE
    const clearList = async list => {
        const delRes = await dispatch(deleteList({ listId: list.id }))
        delRes && setList({})
    }

    // UPDATE
    const removeTodo = async condition => {
        // removes single and completed via dynamic filter param
        const remaining = list.items ? list.items.filter(todo => condition(todo)) : []
        const newList = { ...list, items: remaining, updatedAt: Date.now() }

        setFilteredTodos(newList.items) // update client state first for fast UX
        const todosRes = await dispatch(updateList({ list: newList }))
        setTodoState(todosRes)
    }

    const updateTodoList = async updatedTodo => {
        const todosCopy = JSON.parse(JSON.stringify(list.items));
        const index = todosCopy.findIndex(todo => todo.id === updatedTodo.id)

        if (index === -1) {
            todosCopy.push(updatedTodo) // adds new todo
        } else {
            todosCopy[index] = updatedTodo
        }

        const newList = { ...list, items: todosCopy, updatedAt: Date.now() }

        setFilteredTodos(newList.items) // update client state first for fast UX
        const todosRes = await dispatch(updateList({ list: newList }))
        setTodoState(todosRes)
    }

    return (
        <StyledContainer>
            <InputContainer>
                <StyledInput
                    type="text"
                    onChange={(e) => { setInputVal(e.target.value) }}
                    placeholder="Create a new todo..."
                    value={inputVal}
                />
                <Submit onClick={() => { addTodo() }}>Submit</Submit>
            </InputContainer>
            <StyledCard>
                <Table>
                    <TableBody>
                        {filteredTodos.map(({ completed, description, id }, i) => (
                            <ToDoRow key={i} {...{ completed, description, id, removeTodo, updateTodoList }} />
                        ))}
                    </TableBody>
                </Table>
                <Footer>
                    {list.items && list.items.length > 0 &&
                        <>
                            <h3>{list.items.filter(todo => !todo.completed).length} items left</h3>
                            {!mobile && <Filters />}
                            <h3 onClick={() => {
                                removeTodo((t) => !t.completed)
                            }}>Clear Completed</h3>
                        </>
                    }
                </Footer>
            </StyledCard>
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