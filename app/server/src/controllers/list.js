const { ListModel } = require('../models') 

const catchErr = (err) => {
    console.error(err);
    return false
}

const createList = async listObj => {
    try {
        return await ListModel.insertOne(listObj)
    } catch (err) {
        catchErr(err)
    }
}

const deleteList = async id => {
    try {
        return await ListModel.remove({ id }, true)
    } catch (err) {
        catchErr(err)
    }
}

const readList = async id => {
    try {
        return await ListModel.findOne({ id })
    } catch (err) {
        catchErr(err)
    }
}

const updateList = async listObj => {
    try {
        return await ListModel.findOneAndReplace(
            { "id" : listObj.id },
            listObj,
            { returnDocument: 'after' }
        )
    } catch (err) {
        catchErr(err)
    }
}


module.exports = {
    createList,
    deleteList,
    readList,
    updateList
}