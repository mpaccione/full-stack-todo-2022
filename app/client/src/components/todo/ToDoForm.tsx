import React, { useEffect, useState } from 'react'
import { Card, Container, Table } from "@mui/material"
import { v4 as uuid } from "uuid"
import styled from "styled-components"

import { CompletedToggle } from './ToDoRow'
import { createList, deleteList, getList, updateList } from './actions'
import { List, ToDo } from '../../shared/types'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import theme from '../../theme'
import ToDoDragAndDrop from './ToDoDragAndDrop';

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
    bottom: 0;
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 15px 5px 15px;
    position: sticky;

    ${props => props.theme.theme === 'dark' ? `
        background-color: ${props.theme.color2} !important;
        color: ${props.theme.color3} !important;
    ` : `
        background-color: white !important;
        color: ${props.theme.color5} !important;
    `}

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
    max-height: ${props => props.theme.mobile ? '100vh' : '65vh'};
    overflow: auto;

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
    width: 100%;

    ${props => props.theme.theme === 'dark' ?
        `   color: ${props.theme.color3};
        background-color: ${props.theme.color2};
    ` :
        `   color: ${props.theme.color5};
        background-color: 'white';
    `};
`

// NOTE: A user id would normally be sent to fetch all list id's
// Since we only have one list in this example the list id will be static
const emptyList = { createdAt: 0, id: '', items: [], updatedAt: 0 }
const listId = 'cabc437a-4ba0-4086-9d74-8b975febb936'
const fArr = ['All', 'Active', 'Completed']
const filterMap = {
    'Active': false,
    'Completed': true
}

const ToDoForm = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const [filteredTodos, setFilteredTodos] = useState<Array<ToDo | void>>([])
    const [inputVal, setInputVal] = useState('')
    const [list, setList] = useState<List>(emptyList)
    const [loaded, setLoaded] = useState(false)

    const dispatch = useAppDispatch()
    const mobile = useAppSelector(state => state.settings.mobile)

    useEffect(() => {
        getSavedList(listId)
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (list.hasOwnProperty('items') && loaded) {
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

        if (!list.hasOwnProperty('items')) {
            const todosRes = await dispatch(createList(newTodo))
            return setTodoState(todosRes)
        }

        updateTodoList(newTodo)
    }

    const filterList = (list: List) => {
        if (activeFilter === 'All') {
            return setFilteredTodos(list.items)
        }

        setFilteredTodos(list.items.filter((todo: ToDo) => todo.completed === filterMap[activeFilter as keyof object] as {}))
    }

    const setTodoState = (todosRes: List) => {
        todosRes && setList(todosRes)
        filterList(todosRes ? todosRes : list) // if api call failed revert state
    }

    //////////
    // READ
    const getSavedList = async (listId: string) => {
        const todosRes = await dispatch(getList(listId))
        setTodoState(todosRes)
    }

    // DELETE
    const clearList = async (list: List) => {
        const delRes = await dispatch(deleteList(list.id))
        delRes && setList(emptyList)
    }

    // UPDATE
    const removeTodo = async (condition: Function) => {
        // removes single and completed via dynamic filter param
        const remaining = list.items ? list.items.filter(todo => condition(todo)) : []
        const newList = { ...list, items: remaining, updatedAt: Date.now() }

        setFilteredTodos(newList.items) // update client state first for fast UX
        const todosRes = await dispatch(updateList(newList))
        setTodoState(todosRes)
    }

    const updateTodoList = async (updatedTodo: ToDo) => {
        const todosCopy = JSON.parse(JSON.stringify(list.items));
        const index = todosCopy.findIndex((todo: ToDo) => todo.id === updatedTodo.id)

        if (index === -1) {
            todosCopy.push(updatedTodo) // adds new todo
        } else {
            todosCopy[index] = updatedTodo
        }

        const newList = { ...list, items: todosCopy, updatedAt: Date.now() }

        setFilteredTodos(newList.items) // update client state first for fast UX
        const todosRes = await dispatch(updateList(newList))
        setTodoState(todosRes)
    }

    return (
        <StyledContainer>
            <InputContainer>
                <CompletedToggle style={{ cursor: "default", margin: "0px 16px" }} />
                <StyledInput
                    type="text"
                    onChange={(e) => { setInputVal(e.target.value) }}
                    onKeyPress={(e) => { e.key === 'Enter' && addTodo() }}
                    placeholder="Create a new todo..."
                    value={inputVal}
                />
            </InputContainer>
            <StyledCard>
                <Table>
                    <ToDoDragAndDrop 
                        {...{ 
                            filteredTodos, 
                            list, 
                            removeTodo, 
                            setFilteredTodos, 
                            setList,
                            setTodoState, 
                            updateTodoList 
                        }}
                    />
                </Table>
                <Footer>
                    {list.items.length > 0 &&
                        <>
                            <h3>{list.items.filter((todo: ToDo) => !todo.completed).length} items left</h3>
                            {!mobile && <Filters />}
                            <h3 onClick={() => {
                                removeTodo((t: ToDo) => !t.completed)
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