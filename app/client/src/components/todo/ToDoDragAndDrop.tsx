import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { TableBody, TableRow } from '@mui/material';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks'
import { updateList } from './actions'
import { List, ToDo } from '../../shared/types';
import themeObj from '../../theme';
import ToDoRow from './ToDoRow';

const { primaryGradient } = themeObj.primary

const SpacerRow = styled(TableRow)`
    height: 50px;
`

const ToDoDragAndDrop = ({
    filteredTodos,
    list,
    removeTodo,
    setFilteredTodos,
    setList,
    setTodoState,
    updateTodoList
} : {
    filteredTodos: Array<ToDo | void>,
    list: List,
    removeTodo: Function,
    setFilteredTodos: Function,
    setList: Function,
    setTodoState: Function,
    updateTodoList: Function
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useAppDispatch()

    const getItemStyle = (isDragging: boolean, draggableStyle: object) => ({
        background: isDragging ? primaryGradient : "",
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? primaryGradient : "",
    });

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            filteredTodos,
            result.source.index,
            result.destination.index
        );
        const newList = { ...list, items }

        // update client state first for fast UX
        setFilteredTodos(items);
        setList(newList);
        setIsDragging(false);

        const todosRes = await dispatch(updateList(newList))
        setTodoState(todosRes)
    };

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} >
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <TableBody
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {filteredTodos.map((todo: any, idx: number) => (
                            <Draggable draggableId={todo.id} index={idx} key={todo.id}>
                                {(provided: any, snapshot) => (
                                    <>
                                        <ToDoRow
                                            {...{
                                                draggableProps: provided.draggableProps,
                                                dragHandleProps: provided.dragHandleProps,
                                                placeholder: provided.placeholder,
                                                ...todo,
                                                removeTodo,
                                                updateTodoList
                                            }}
                                            className={snapshot.isDragging ? 'isDragging' : ''}
                                            innerRef={provided.innerRef}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        />
                                        {provided.placeholder}
                                    </>
                                )}
                            </Draggable>
                        ))}
                        {isDragging && <SpacerRow /> /* Spacer */}
                    </TableBody>
                )}
            </Droppable>
        </DragDropContext >
    )

}

export default ToDoDragAndDrop