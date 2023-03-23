const adminValidation = require('../validation/admin.validation')
const { validate } = require("../utils/validate");

const makeAdmin = (req, res, next) => {
    const validation = validate(adminValidation.makeAdmin, req);
    if (!validation.status) return next(ApiError(validation.error))
    Object.assign(req, validation.value);
    next()
}

module.exports = {
    makeAdmin
}