const Joi = require('joi')

const itemSchema = Joi.object({
    id: Joi.string().uuid(),
    completed: Joi.boolean(),
    description: Joi.string()
})

const listSchema = Joi.object({
    id: Joi.string().uuid(),
    items: Joi.array(),
    createdAt: Joi.number(), // ms
    updatedAt: Joi.number() // ms
})

const validator = async(schema, obj) => {
    return await [schema].validateAsync(obj)
}

const isValidList = listObj => {
    let isValid = true;

    // validate list
    if (!listObj || !validator(listSchema, listObj)) {
        return false
    }

    // validate items
    const itemLength = listObj.items.length

    if (itemLength) {
        for (let i = 0; i < itemLength; i++) {
            if (!validator(itemSchema, array[i])) {
                isValid = false
                i = itemLength // break
            }   
        }
    }

    return isValid;
}

module.exports = {
    isValidList
}