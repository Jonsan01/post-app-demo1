class RedirectError extends Error {
    constructor(redirect, message) {
        super(message);
        this.redirect = redirect
    }
}

class ApiError extends Error {
    constructor(message) {
        super(message);
    }
    get json() {
        return { status: 'fail', error: this.message }
    }
}

class RenderError extends Error {
    constructor(message, renderPath, json) {
        super(message);
        this.renderPath = renderPath;
        this.json = json
    }
}
module.exports = { RedirectError, ApiError, RenderError }