const mongoose = require("mongoose");

const Schema = mongoose.schema

const ListSchema = new Schema({
    id: Schema.Types.ObjectId,
    items: []
})

const ListModel = mongoose.model('List', ListSchema)