const express = require('express')
const { listController } = require('../controllers')
const { isValidList, isValidUUID } = require('../utils')

const { createList, deleteList, readList, updateList } = listController
const listRouter = express.Router({ mergeParams: true });

listRouter.use((req, res, next) => {
    console.log({ QUERY: req.query })
    if (!req.query || !req.query.listId) {
        return res.status(400).send({ message: 'No List UUID Submitted' })
    }

    if (!isValidUUID(req.query.listId)) {
        return res.status(400).send({ message: 'Incorrect UUID Submitted' })
    }

    if (req.method === 'POST' || req.method === 'PUT') {
        if (!isValidList(req.body)) {
            return res.status(400).send({ message: 'Incorrect List Submitted' })
        }
    }

    next()
})

// CREATE
listRouter.post('/', (req, res) => {
    const list = createList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Creation Error' })

    res.status(200).send(list)
})

// READ 
listRouter.get('/', (req, res) => {
    const list = readList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Read Error' })
    // const list = {
    //     id: "cabc437a-4ba0-4086-9d74-8b975febb936",
    //     items: [
    //         {
    //             id: '30834b7c-bbba-49e8-8356-af4b4736bd97',
    //             completed: true,
    //             description: 'Review Coding Challenge'
    //         },
    //         {
    //             id: '8e9fcc61-9e8f-451d-b7ee-f8445268b3ff',
    //             completed: false,
    //             description: 'Hire Michael Paccione'
    //         },
    //         {
    //             id: '8ca3449a-3f81-4d2e-8b27-89e9f2b2a7cc',
    //             completed: false,
    //             description: 'Live Long and Prosper'
    //         }
    //     ]
    // }

    res.status(200).send(list)
})

// UPDATE
listRouter.put('/', (req, res) => {
    const list = updateList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Update Error' })

    res.status(200).send(list)
})

// DELETE
listRouter.delete('/', (req, res) => {
    const list = deleteList(req.params.listId)
    !list && res.status(500).send({ message: 'Database Deletion Error' })

    res.status(204).send()
})

module.exports = listRouter