const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
    user: Joi.object({
        id: Joi.string().required().custom(objectId)
    }),
    body: Joi.object({
        postTitle: Joi.string().required().min(5).max(20).label("Post Title"),
        postContent: Joi.string().required().min(5).max(50).label("Post Content")
    }),
    fileNames: Joi.array().min(1).max(10).label("Files")
}

const deletePost = {
    body: Joi.object({
        userId: Joi.string().required().custom(objectId),
        postId: Joi.string().required().custom(objectId)
    })
}

const editForm = {
    params: {
        PostId: Joi.string().required().custom(objectId)
    }
}

const edit = {
    user: Joi.object({
        id: Joi.string().required().custom(objectId)
    }),
    body: Joi.object({
        postTitle: Joi.string().required().min(5).max(20).label("Post Title"),
        postContent: Joi.string().required().min(5).max(50).label("Post Content")
    }),
    fileNames: Joi.array().min(0).max(10).label("Files")
}

const removeImg = {
    body: Joi.object({
        imgPath: Joi.string().required(),
        postId: Joi.string().required().custom(objectId)
    })
}

module.exports = {
    createPost,
    deletePost,
    editForm,
    edit,
    removeImg
}