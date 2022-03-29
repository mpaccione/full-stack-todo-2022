const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes')
const { seedJson } = require('./utils')
const { ListModel } = require('./models')

const app = express()
const BASE_PATH = '/api/v1'
const DB_URI = 'mongodb://mongodb:27017/todo_db'
const PORT = process.env.SERVER_PORT || 5000

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// database
async function db() {
    return await mongoose.connect(DB_URI, { autoIndex: false })
}

db().then(async () => { 
    // seed
    await ListModel.deleteMany({}) 

    new ListModel(seedJson[0]).save((err, list) => {
        if (err) {
            return console.error(err)
        }
        console.log(`Seeded: ${list}`)
    })
}).catch(err => console.error(err))


// routes
app.use(`${BASE_PATH}/list`, routes.listRouter)

// testing
app.get('/ping', (req, res) => {
    res.send('pong!');
});

app.get('/collections', async (req, res) => {
    const lists = await ListModel.find()
    res.send({ lists })
});

// server
app.listen(PORT, () => console.log(`Server Listening at http://localhost:${PORT}`))

exports.app = { app, BASE_PATH }