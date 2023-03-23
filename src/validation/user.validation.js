const Joi = require('joi');
const { objectId, password } = require('./custom.validation');

const createUser = {
    body: Joi.object({
        username: Joi.string().required().min(2).max(10).trim(),
        email: Joi.string().email().required().trim().lowercase(),
        password: Joi.string().required().custom(password),
        confirm_password: Joi.string().required().label("conform password").equal(Joi.ref('password')).messages({ 'any.only': '{{#label}} does not match' })
    })
}

const loginUser = {
    body: Joi.object({
        username: Joi.string().required().min(2).max(10).trim(),
        password: Joi.string().min(8).required()
    })
}

const updateUser = {
    body: Joi.object({
        userId: Joi.string().required().custom(objectId),
        username: Joi.string().required().min(2).max(10).trim(),
        email: Joi.string().email().required().trim().lowercase()
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser
}