import React, { useEffect, useState } from 'react'
import { Card, Container, Table, TableBody, TableFooter } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { ToDoRow } from './index'
import { getList, saveList } from './actions'

const StyledCard = styled(Card)`
    align-content: center;
    display: flex;
    flex-direction: row;
    height: 35px;
    justify-content: space-between;
    padding: 15px 0px;

`

const StyledContainer = styled(Container)`
    padding: 0 !important;
`

const Submit = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-right: 15px;
`

const StyledInput = styled.input`
    border: none;
    font-size: 1em;
    margin-left: 15px;
    width: 80%;
`

const TableFooterStyled = styled(TableFooter)`
    display: flex;
    justify-content: space-between;
`

// NOTE: A user id would normally be sent to fetch all list id's
// Since we only have one list in this example the list id will be static
const uuid = 'cabc437a-4ba0-4086-9d74-8b975febb936'

const filterMap = {
    'Active': true,
    'Completed': false
}

const ToDoForm = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const [todos, setTodos] = useState([])
    const [filteredTodos, setFilteredTodos] = useState([])

    const dispatch = useDispatch()
    const mobile = useSelector(state => state.settings.mobile)

    useEffect(() => {
        getSavedList(uuid)
    }, [])

    useEffect(() => {

    }, [activeFilter])

    // subcomponent
    const Filters = () => (
        <>
            <h3 onClick={() => { setActiveFilter('All') }}>All</h3>
            <h3 onClick={() => { setActiveFilter('Active') }}>Active</h3>
            <h3 onClick={() => { setActiveFilter('Completed') }}>Completed</h3>
        </>
    )

    // functions
    const filterTodos = todos => {
        if (activeFilter === 'All') {
            return todos
        }

        return todos.filter(todo => todo.completed === filterMap[activeFilter])
    }

    // READ
    const getSavedList = async (uuid) => {
        const res = await dispatch(getList(uuid))

        if (res) {
            setTodos(res)
            setFilteredTodos(filterTodos(res))
        }
    }

    // DELETE
    const removeCompleted = async todos => {
        const remaining = todos.filter(todo => todo.completed)
        const res = await dispatch(saveList({ list: remaining, uuid }))

        setTodos(res)
        setFilteredTodos(filterTodos(res))
    }

    // UPDATE
    const updateList = async (newTodo) => {
        setTodos([...todos, newTodo])

        const res = await dispatch(updateList({ list: todos, uuid }))

        setTodos(res)
        setFilteredTodos(filterTodos(res))
    }

    return (
        <StyledContainer>
            <StyledCard>
                <StyledInput type="text" placeholder="Create a new todo..." />
                <Submit onClick={(e) => { updateList(e.target.value) }}>Submit</Submit>
            </StyledCard>
            <Table>
                <TableBody>
                    {todos.map((todo, key) => (
                        <ToDoRow {...{ key, todo }} />
                    ))}
                </TableBody>
                <TableFooterStyled>
                    {todos.length > 0 &&
                        <>
                            <h3>{todos.length} items left</h3>
                            {!mobile && <Filters />}
                            <h3 onClick={() => {
                                removeCompleted(todos)
                            }}>Clear Completed</h3>
                        </>
                    }
                </TableFooterStyled>
                {mobile &&
                    <StyledCard>
                        <Filters />
                    </StyledCard>
                }
            </Table>
        </StyledContainer>
    )
}

export default ToDoForm