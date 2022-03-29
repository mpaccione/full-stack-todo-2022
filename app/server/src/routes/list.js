const express = require('express')
const { listController } = require('../controllers')
const { isValidItem, isValidList, isValidUUID, seedJson } = require('../utils')

const { createList, deleteList, readList, updateList } = listController

const listRouter = express.Router({ mergeParams: true });

listRouter.use(async (req, res, next) => {
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
})

// CREATE
listRouter.post('/', async (req, res) => {
    // NOTE: Due to the use case of only one list we manually create it
    const newList = seedJson[0]
    newList.items = [req.body.newTodo]
    newList.createdAt = Date.now()
    newList.updatedAt = Date.now()

    const list = await createList(newList) 

    if (!list) {
        return res.status(500).json({ message: 'Database Creation Error' })
    }

    res.status(200).json(list)
})

// READ 
listRouter.get('/', async (req, res) => {
    const list = await readList(req.query.listId)

    if (!list) { 
        return res.status(500).json({ message: 'Database Read Error' })
    }

    res.status(200).json(list)
})

// UPDATE
listRouter.put('/', async (req, res) => {
    const list = await updateList(req.body.list)

    if (!list) {
        return res.status(500).json({ message: 'Database Update Error' })
    }

    res.status(200).json(list)
})

// DELETE
listRouter.delete('/', async (req, res) => {
    const list = await deleteList(req.query.listId)

    if (!list) { 
        return res.status(500).send({ message: 'Database Deletion Error' })
    }

    res.status(200).json(list)
})

module.exports = listRouter