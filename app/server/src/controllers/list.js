const { ListModel } = require('../models') 
const { isValidItem, isValidList, isValidUUID, seedJson } = require('../utils')

// MIDDLEWARE
const middlewareList = async (req, res, next) => {
    // query string methods
    if (req.method === 'DELETE' || req.method === 'GET') {
        if (!req.query || !req.query.listId) {
            return res.status(400).json({ message: 'No List UUID Submitted' })
        }

        if (!isValidUUID(req.query.listId)) {
            return res.status(400).json({ message: 'Incorrect UUID Submitted' })
        }
    }

    // body methods
    if (req.method === 'POST') {
        if (!req.body.hasOwnProperty('newTodo') || req.body.newTodo === {}) {
            return res.status(400).json({ message: 'No List Body Submitted' })
        }

        if (!(await isValidItem(req.body.newTodo))) {
            return res.status(400).json({ message: 'Incorrect Todo Submitted' })
        }
    }

    if (req.method === 'PUT') {
        if (!req.body.hasOwnProperty('list') || req.body.list === {}) {
            return res.status(400).json({ message: 'No List Body Submitted' })
        }

        if (!(await isValidList(req.body.list))) {
            return res.status(400).json({ message: 'Incorrect List Submitted' })
        }
    }

    next()
}

// ROUTES
const catchErr = (err) => {
    console.error(err);
    return res.status(500).json({ message: err })
}

const createList = async (req, res) => {
    // NOTE: Due to the use case of only one list we manually create it
    const newList = seedJson[0]
    newList.items = [req.body.newTodo]
    newList.createdAt = Date.now()
    newList.updatedAt = Date.now()

    try {
        list = await new ListModel(listObj).save()
        res.status(200).json(list)
    } catch (err) {
        return catchErr(err)
    }
}

const deleteList = async (req, res) => {
    try {
        list = await ListModel.deleteOne({ id: req.query.listId })
        res.status(200).json(list)
    } catch (err) {
        return catchErr(err)
    }
}

const readList = async (req, res) => {
    try {
        list = await ListModel.findOne({ id: req.query.listId })
        res.status(200).json(list)
    } catch (err) {
        return catchErr(err)
    }
}

const updateList = async (req, res) => {
    const listObj = req.body.list

    try {
        list = await ListModel.findOneAndReplace(
            { "id" : listObj.id },
            listObj,
            { returnDocument: 'after' }
        )
        res.status(200).json(list)
    } catch (err) {
        return catchErr(err)
    }
}

module.exports = {
    createList,
    deleteList,
    middlewareList,
    readList,
    updateList
}