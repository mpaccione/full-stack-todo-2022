const seedJson = require('./seed')
const validation = require('./validation.js')

module.exports = {
    ...seedJson,
    ...validation
}