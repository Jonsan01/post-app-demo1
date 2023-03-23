const commentValidation = require("../validation/comment.validation")
const { validate } = require("../utils/validate");
const { ApiError } = require("../utils/AppError");

const create = (req, res, next) => {
    const validation = validate(commentValidation.create, req);
    if (!validation.status) return next(new ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}

const update = (req, res, next) => {
    const validation = validate(commentValidation.update, req);
    if (!validation.status) return next(new ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}

const remove = (req, res, next) => {
    const validation = validate(commentValidation.remove, req);
    if (!validation.status) return next(new ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}

module.exports = {
    create,
    update,
    remove
}