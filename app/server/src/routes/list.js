const express = require('express')
const { createList, deleteList, readList, updateList } = require('../controllers')
const { isValidList, isValidUUID } = require('../utils')

const listRouter = express.Router();

listRouter.use((req, res, next) => {
    if (!req.params || !req.params.uuid || !isValidUUID(req.params.listId)) {
        res.status(400).send({ message: 'Incorrect UUID Submitted' })
    }

    if (req.method === 'POST' || req.method === 'PUT') {
        !isValidList(req.body) && res.status(400).send({ message: 'Incorrect List Submitted' })
    }
})

// CREATE
listRouter.post('/:listId', (req, res) => {


    const list = createList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Creation Error' })

    res.status(200).send(list)
})

// READ 
listRouter.get('/:listId', (req, res) => {
    const list = readList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Read Error' })

    res.status(200).send(list)
})

// UPDATE
listRouter.put('/:listId', (req, res) => {
    const list = updateList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Update Error' })

    res.status(200).send(list)
})

// DELETE
listRouter.delete('/:listId', (req, res) => {
    const list = deleteList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Deletion Error' })

    res.status(204).send()
})

module.exports = listRouter