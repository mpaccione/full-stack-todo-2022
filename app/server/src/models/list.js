const mongoose = require("mongoose");

const Schema = mongoose.schema

const ListSchema = new Schema({
    createdAt: Number,
    id: Schema.Types.ObjectId,
    items: [],
    updatedAt: Number
})

const ListModel = mongoose.model('List', ListSchema)

module.exports = {
    ListModel
}