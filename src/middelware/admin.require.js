const { RenderError } = require("../utils/AppError")

const adminRequire = (req, res, next) => {
    if (!req.isAdmin) return next(new RenderError("", "pages/404", { login: req.isLogin, error: "page not found", isAdmin: req.isAdmin }))
    next()
}

module.exports = adminRequire