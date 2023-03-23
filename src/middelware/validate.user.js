const userValidation = require("../validation/user.validation")
const { validate } = require("../utils/validate");
const { RenderError, ApiError } = require("../utils/AppError");

const validateSchema = (req, res, next, schema, randerPath) => {
    const validation = validate(schema, req);
    if (!validation.status) return next(new RenderError("", randerPath, { login: 'false', error: validation.error }))
    Object.assign(req, validation.value);
    next()
}

const create = (req, res, next) => {
    validateSchema(req, res, next, userValidation.createUser, "pages/register")
}

const login = (req, res, next) => {
    validateSchema(req, res, next, userValidation.loginUser, "pages/login")
}

const update = (req, res, next) => {
    const validation = validate(userValidation.updateUser, req);
    if (!validation.status) return next(new ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}


module.exports = {
    create,
    login
}