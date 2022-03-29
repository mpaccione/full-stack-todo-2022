const express = require('express')
const { listController } = require('../controllers')
const { isValidItem, isValidList, isValidUUID } = require('../utils')

const { createList, deleteList, readList, updateList } = listController
const { seedJson } = require('../utils')

const listRouter = express.Router({ mergeParams: true });

listRouter.use((req, res, next) => {
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
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body || req.body === {}) {
            return res.status(400).json({ message: 'No List Body Submitted' })
        }

        if (req.body.newTodo && !isValidItem(req.body.newTodo)) {
            return res.status(400).json({ message: 'Incorrect Todo Submitted' })
        }

        if (req.body.list && !isValidList(req.body.list)) {
            return res.status(400).json({ message: 'Incorrect List Submitted' })
        }
    }

    next()
})

// CREATE
listRouter.post('/', async (req, res) => {
    // NOTE: Due to the use case of only one list we manually create it
    const item = req.body.newTodo
    const newList = seedJson[0]
    newList.items = [item]
    newList.createdAt = Date.now()
    newList.updatedAt = Date.now()

    const list = await createList(newList) 
    console.log({ list })
    !list && res.status(500).json({ message: 'Database Creation Error' })

    res.status(200).json(list)
})

// READ 
listRouter.get('/', async (req, res) => {
    const list = await readList(req.query.listId)
    !list && res.status(500).json({ message: 'Database Read Error' })

    res.status(200).json(list)
})

// UPDATE
listRouter.put('/', async (req, res) => {
    const list = await updateList(req.body.list)
    !list && res.status(500).json({ message: 'Database Update Error' })

    res.status(200).json(list)
})

// DELETE
listRouter.delete('/', async (req, res) => {
    const list = await deleteList(req.query.listId)
    !list && res.status(500).send({ message: 'Database Deletion Error' })

    res.status(200).json(list)
})

module.exports = listRouter