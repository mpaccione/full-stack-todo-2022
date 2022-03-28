import { get, post, put } from '../../api'

const getList = uuid => async dispatch => {
    const res = await get(`/${uuid}`)
    return res
}

const saveList = ({ list, uuid }) => async dispatch => {
    const res = await post(`/${uuid}`, list)
    return res
}

const updateList = ({ list, uuid }) => async dispatch => {
    const res = await put(`/${uuid}`, list)
    return res
}

export { 
    getList,
    saveList,
    updateList 
}