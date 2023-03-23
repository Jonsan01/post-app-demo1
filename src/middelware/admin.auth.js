const userModel = require("../model/user.model")

const checkAdmin = async (req, res, next) => {
    try {
        if (req.isLogin) {
            const user = await userModel.findById(req.user.id).populate('role');
            const AdminIndex = user.role.findIndex(e => e.name == "admin");
            if (AdminIndex == -1) req.isAdmin = false;
            else req.isAdmin = true
        } else {
            req.isAdmin = false;
        }
    } catch (error) {
        req.isAdmin = false;
    }
    next()
}

module.exports = checkAdmin