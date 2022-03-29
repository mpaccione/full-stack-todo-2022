import { del, get, post, put } from '../../api'
import { showLoader } from "../../redux/settingsSlice";

// NOTE: Creating a list would occur when there is no existing list
// or when all tasks have been deleted and a new one is added.

const createList = ({ list }) => async dispatch => {
    dispatch(showLoader(true));
    const res = await post(`/list`, { list })
    dispatch(showLoader(false));
    return res.data
}

// NOTE: Deleting a list would occur when there is no existing items.

const deleteList = ({ listId }) => async dispatch => {
    dispatch(showLoader(true));
    const res = await del(`/list/?listId=${listId}`)
    dispatch(showLoader(false));
    return res.data
}

const getList = ({ listId }) => async dispatch => {
    dispatch(showLoader(true));
    const res = await get(`/list/?listId=${listId}`)
    dispatch(showLoader(false));
    return res.data
}

const updateList = ({ list }) => async dispatch => {
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