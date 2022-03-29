const { ListModel } = require('../models') 

const catchErr = (err) => {
    console.error(err);
    return false
}

const createList = async listObj => {
    try {
        return await new ListModel(listObj).save()
    } catch (err) {
        catchErr(err)
    }
}

const deleteList = async id => {
    try {
        return await ListModel.deleteOne({ id })
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