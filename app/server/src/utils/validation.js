const Joi = require('joi')

const itemSchema = Joi.object({
    completed: Joi.boolean(),
    description: Joi.string(),
    id: Joi.string().uuid(),
})

const listSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    createdAt: Joi.number(), // ms
    id: Joi.string().uuid(),
    items: Joi.array(),
    updatedAt: Joi.number() // ms
})

const uuidSchema = Joi.string().uuid()

const validator = async (schema, obj) => {
    return await schema.validateAsync(obj)
}

const isValidList = async listObj => {
    let isValid = true;

    // validate list
    if (!listObj || !validator(listSchema, listObj)) {
        return false
    }

    // validate items
    const itemLength = listObj.items.length

    if (itemLength) {
        for await (const item of listObj.items) {
            if (!validator(itemSchema, item)) {
                isValid = false
                i = itemLength // break
            }   
        }
    }

    return isValid;
}

const isValidUUID = async uuid => {
    const result = await uuidSchema.validateAsync(uuid)

    if (result.error) {
        return false
    }

    return true
}

module.exports = {
    isValidList,
    isValidUUID
}