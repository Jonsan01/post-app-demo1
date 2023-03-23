const roleModel = require("../model/role.model");
const userModel = require("../model/user.model");
const { ApiError } = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const showAllUserLis = catchAsync(async (req, res, next) => {
    const allUser = await userModel
        .find()
        .select("username email role createdAt updatedAt")

    res.render("pages/allUser", { login: req.isLogin, isAdmin: req.isAdmin, users: allUser, userId: req.user.id })
}, "Api")

const makeAdmin = catchAsync(async (req, res, next) => {
    const admin = await userModel.findById(req.body.adminId).populate('role');
    const user = await userModel.findById(req.body.userId).populate('role');

    const Adminroles = admin.role.map(e => e.name)
    const userroles = user.role.map(e => e.name)

    if (!Adminroles.includes('admin')) return next(new ApiError("You Don't have permission..."));
    if (userroles.includes('admin')) return next(new ApiError("User alredy Admin..."));

    const AdminRole = await roleModel.findOne({ name: "admin" });
    const UserRole = await roleModel.findOne({ name: "user" });

    const AdminRoleId = AdminRole.id;
    const UserRoleId = UserRole.id;

    await userModel.findByIdAndUpdate(req.body.userId, { role: [AdminRoleId, UserRoleId] });

    res.json({ status: 'sucess' })
}, "Api")

module.exports = {
    showAllUserLis,
    makeAdmin
}