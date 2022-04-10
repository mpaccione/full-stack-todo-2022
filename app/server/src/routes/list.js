const express = require('express')

const { listController } = require('../controllers')
const { createList, deleteList, middlewareList, readList, updateList } = listController

const listRouter = express.Router({ mergeParams: true });

listRouter.use(middlewareList)

// CREATE
listRouter.post('/', createList)

// READ 
listRouter.get('/', readList)

// UPDATE
listRouter.put('/', updateList)

// DELETE
listRouter.delete('/', deleteList)

module.exports = listRouter