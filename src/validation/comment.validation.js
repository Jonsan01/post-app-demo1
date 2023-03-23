const Joi = require('joi');
const { objectId } = require('./custom.validation');

const create = {
    body: Joi.object({
        userId: Joi.string().required().custom(objectId),
        content: Joi.string().required().trim().min(5).max(70),
        postId: Joi.string().required().custom(objectId)
    })
}

const update = {
    body: Joi.object({
        userId: Joi.string().required().custom(objectId),
        content: Joi.string().required().trim().min(5).max(70),
        postId: Joi.string().required().custom(objectId),
        commentId: Joi.string().required().custom(objectId),
    })
}

const remove = {
    body: Joi.object({
        userId: Joi.string().required().custom(objectId),
        postId: Joi.string().required().custom(objectId),
        commentId: Joi.string().required().custom(objectId)
    })
}

module.exports = {
    create,
    update,
    remove
}