import { get, post, put } from '../../api'
import { showLoader } from "../../redux/settingsSlice";

// NOTE: Creating a list would occur when there is no existing list
// or when all tasks have been deleted. For example purposes not included.

// const createList = ({ list, uuid }) => async dispatch => {
//     const res = await post(`/${uuid}`, list)
//     return res
// }

const getList = ({ uuid }) => async dispatch => {
    dispatch(showLoader(true));
    const res = await get(`/${uuid}`)
    dispatch(showLoader(false));
    return res
}

const updateList = ({ list, uuid }) => async dispatch => {
    dispatch(showLoader(true));
    const res = await put(`/${uuid}`, list)
    dispatch(showLoader(false));
    return res
}

export { 
    // createList,
    getList,
    updateList 
}