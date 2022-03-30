import { del, get, post, put } from '../../api'
import { showLoader } from "../../redux/settingsSlice";
import { List, ToDo } from "../../shared/types"
import type { AppDispatch } from '../../redux/store';

// NOTE: Creating a list would occur when there is no existing list
// or when all tasks have been deleted and a new one is added.

const createList = (newTodo: ToDo) => async (dispatch: AppDispatch) => {
    dispatch(showLoader(true));
    const res = await post(`/list`, { newTodo })
    dispatch(showLoader(false));
    return res.data
}

// NOTE: Deleting a list would occur when there is no existing items.

const deleteList = (listId: string) => async (dispatch: AppDispatch) => {
    dispatch(showLoader(true));
    const res = await del(`/list/?listId=${listId}`)
    dispatch(showLoader(false));
    return res.data
}

const getList = (listId: string) => async (dispatch: AppDispatch) => {
    dispatch(showLoader(true));
    const res = await get(`/list/?listId=${listId}`)
    dispatch(showLoader(false));
    return res.data
}

const updateList = (list: List) => async (dispatch: AppDispatch) => {
    dispatch(showLoader(true));
    const res = await put(`/list`, { list })
    dispatch(showLoader(false));
    return res.data
}

export {
    createList,
    deleteList,
    getList,
    updateList
}