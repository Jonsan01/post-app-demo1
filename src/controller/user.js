const userModel = require('./../model/user.model')
const roleModel = require('./../model/role.model')
const jwt = require('jsonwebtoken')
const catchAsync = require('./../utils/catchAsync')


exports.registerForm = (req, res, next) => {
    res.render("pages/register", { login: req.isLogin, error: null,isAdmin:req.isAdmin })
}

exports.Register = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const userRole = await roleModel.findOne({ name: "user" })
    await userModel.create({ username, email, password, role: [userRole.id] })
    res.redirect("/login")
}, "userRegister")

exports.loginForm = (req, res, next) => {
    res.render('pages/login', { login: req.isLogin, error: null,isAdmin:req.isAdmin })
}

exports.login = catchAsync(async (req, res, next) => {

    const { username, password } = req.body
    const user = await userModel.findOne({ username });

    if (!user || !user.comparePassword(password)) throw new Error("Invalid username or password")
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '10d' })

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    res.redirect("/")
}, "userLogin")

exports.logoutUser = (req, res, next) => {
    res.clearCookie('token');
    res.redirect("/")
}

exports.profilePage = catchAsync(async (req, res, next) => {
    const dbUser = await userModel.findById(req.user.id)
    res.render("pages/profile", { login: req.isLogin, userId: req.user.id, email: dbUser.email, username: dbUser.username,isAdmin:req.isAdmin })
}, "profilePage")

exports.updateProfile = catchAsync(async (req, res, next) => {
    if (req.user.id != req.body.userId) throw new Error("You Don't have permission")
    await userModel.findByIdAndUpdate(req.body.userId, { email: req.body.email, username: req.body.username });
    res.json({ status: 'sucess' });
}, "updateProfile")
