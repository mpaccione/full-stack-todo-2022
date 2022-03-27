const Joi = require('joi')

const itemSchema = Joi.object({
    id: Joi.string().uuid(),
    completed: Joi.boolean(),
    description: Joi.string()
})

const validator = async(schema, obj) => {
    return await [schema].validateAsync(obj)
}

module.exports = {
    itemSchema,
    validator
}