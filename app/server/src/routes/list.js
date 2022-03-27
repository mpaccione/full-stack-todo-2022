const express = require('express')
const { isValidList } = require('../utils')

const listRouter = express.Router();

// CREATE
listRouter.post('/:listId', (req, res) => {

})

// READ 
listRouter.get('/:listId', (req, res) => {

})

// UPDATE
listRouter.put('/:listId', (req, res) => {

})

// DELETE
listRouter.delete('/:listId', (req, res) => {

})

module.exports = listRouter