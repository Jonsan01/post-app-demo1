const postValidation = require("../validation/post.validation")
const { validate } = require("../utils/validate");
const { RenderError, ApiError, RedirectError } = require("../utils/AppError");

const validateSchema = (req, res, next, schema, randerPath) => {
    const validation = validate(schema, req);
    if (!validation.status) return next(new RenderError("", randerPath, { login: req.isLogin, error: validation.error }))
    Object.assign(req, validation.value);
    next()
}

const create = (req, res, next) => {
    validateSchema(req, res, next, postValidation.createPost, "pages/createPost")
}

const remove = (req, res, next) => {
    const validation = validate(postValidation.deletePost, req);
    if (!validation.status) return next(ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}

const editForm = (req, res, next) => {
    const validation = validate(postValidation.editForm, req);
    if (!validation.status) return next(new RedirectError("/mypost"));
    Object.assign(req, validation.value);
    next()
}

const edit = (req, res, next) => {
    const validation = validate(postValidation.edit, req);
    if (!validation.status) return next(new ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}

const removeImg = (req, res, next) => {
    const validation = validate(postValidation.removeImg, req);
    if (!validation.status) return next(new ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}

module.exports = {
    create,
    remove,
    editForm,
    edit,
    removeImg
}