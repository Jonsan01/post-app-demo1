const { RedirectError, ApiError, RenderError } = require("../utils/AppError")

module.exports = (err, req, res, next) => {
    if (err instanceof RedirectError) {
        return res.redirect(err.redirect)
    }
    if (err instanceof ApiError) {
        return res.status(400).json(err.json)
    }
    if (err instanceof RenderError) {
        return res.render(err.renderPath, err.json)
    }
    console.log(err);
    res.send(err)
}