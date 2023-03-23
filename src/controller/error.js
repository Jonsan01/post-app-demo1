const { RenderError } = require("../utils/AppError")

module.exports = (req, res, next) => {
    next(new RenderError("", "pages/404", { login: req.isLogin, error: "page not found", isAdmin: req.isAdmin }))
}