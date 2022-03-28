const { db } = require('../server.js') 

const catchErr = (e) => {
    console.error(e);
    return false
}

const createList = listObj => {
    try {
        return db.lists.insertOne(listObj)
    } catch (e) {
        catchErr(e)
    }
}

const deleteList = id => {
    try {
        return db.lists.remove({ id }, true)
    } catch (e) {
        catchErr(e)
    }
}

const readList = id => {
    try {
        return db.lists.findOne({ id }, true)
    } catch (e) {
        catchErr(e)
    }
}

const updateList = listObj => {
    try {
        return db.lists.update(
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