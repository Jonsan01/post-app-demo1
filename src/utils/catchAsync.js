const { RedirectError, ApiError, RenderError } = require("./AppError");

module.exports = (fn, middelware) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            console.log(error);
            switch (middelware) {
                case "userRegister":
                    if (error.code == 11000) error = HandelMongoError(error);
                    return next(new RenderError(error.message, "pages/register", { login: req.isLogin, error: error.message }))
                case "userLogin":
                    return next(new RenderError(error.message, "pages/login", { login: req.isLogin, error: error.message }))
                case "profilePage":
                case "myPostPage":
                    return next(new RedirectError("/"));
                case "updateProfile":
                    if (error.code == 11000) error = HandelMongoError(error);
                    return next(new ApiError(error.message));
                case "homePage":
                    return next(new RenderError(error.message, "pages/login", { login: req.isLogin, posts: [], userId: req?.user?.id }))
                case "createPost":
                    return next(new RenderError(error.message, "pages/createPost", { login: req.isLogin, error: error.message }))
                case "editPostForm":
                case "updatePost":
                    return next(new RedirectError("/myposts"));
                case "removePostImage":
                    if (error.message == "post validation failed: media: media must have between 1 and 10 items") {
                        error.message = "post's image must be more then one";
                    }
                    return next(new ApiError(error.message));
                case "createComment":
                case "updateComment":
                case "deleteComment":
                case "deletePost":
                case "Api":
                    return next(new ApiError(error.message));
                default:
                    return next(error)
            }
        })
    }
}

function HandelMongoError(error) {
    const key = Object.keys(error.keyValue).at(0);
    const value = Object.values(error.keyValue).at(0);
    error.message = `${key} ${value} Alredy Exist`;
    return error
}