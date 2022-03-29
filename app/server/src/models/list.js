const mongoose = require("mongoose");

const Schema = mongoose.Schema

// uses different id format for pk
const ListSchema = new Schema({
    createdAt: Number,
    id: {
        index: true,
        required: true,
        type: String,
        unique: true,
    },
    items: Array,
    updatedAt: Number
})

const ListModel = mongoose.model('list', ListSchema)

module.exports = ListModel