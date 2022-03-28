const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
const BASE_PATH = '/api/v1'
const DB_URI = 'mongodb://mongodb:27017/todo_db'
const PORT = process.env.SERVER_PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// database
const db = mongoose.createConnection(DB_URI)

db.on('connected', () => console.log('MongoDB connected'));
db.on('disconnected', () => console.log('MongoDB disconnected'));


// routes
app.use(BASE_PATH, routes.listRouter)

// test
app.get('/ping', (req, res) => {
    res.send('pong!');
});

// server
app.listen(PORT, () => console.log(`Server Listening at http://localhost:${PORT}`))

exports.app = { app, db }