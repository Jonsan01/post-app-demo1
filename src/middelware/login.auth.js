const { RedirectError } = require("../utils/AppError");

const notLoginReq = (req, res, next) => {
    if (req.isLogin) return next(new RedirectError("/"));
    next()
}

const LoginReq = (req, res, next) => {
    if (!req.isLogin) return next(new RedirectError("/login"));
    next()
}

module.exports = { notLoginReq, LoginReq };