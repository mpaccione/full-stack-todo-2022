const { ListModel } = require('../models') 

const catchErr = (e) => {
    console.error(e);
    return false
}

const createList = listObj => {
    try {
        return ListModel.insertOne(listObj)
    } catch (e) {
        catchErr(e)
    }
}

const deleteList = id => {
    try {
        return ListModel.remove({ id }, true)
    } catch (e) {
        catchErr(e)
    }
}

const readList = id => {
    try {
        return ListModel.findOne({ id }, true)
    } catch (e) {
        catchErr(e)
    }
}

const updateList = listObj => {
    try {
        return ListModel.update(
            { "id" : listObj.id },
            { $set : { ...listObj } }
        )
    } catch (e) {
        catchErr(e)
    }
}


module.exports = {
    createList,
    deleteList,
    readList,
    updateList
}