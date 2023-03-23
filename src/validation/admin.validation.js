const Joi = require('joi');

const makeAdmin = {
    body: Joi.object({
        userId: Joi.string().required().length(24),
        adminId: Joi.string().required().length(24)
    })
}

module.exports = {
    makeAdmin
}