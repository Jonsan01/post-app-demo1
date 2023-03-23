const express = require('express');
const checkLogin = require('../middelware/login.auth');
const validateUser = require('../middelware/validate.user');

const userController = require('./../controller/user');

const router = express.Router();

router
    .route("/register")
    .get(checkLogin.notLoginReq, userController.registerForm)
    .post(checkLogin.notLoginReq, validateUser.create, userController.Register)


router
    .route("/login")
    .get(checkLogin.notLoginReq, userController.loginForm)
    .post(checkLogin.notLoginReq, validateUser.login, userController.login)

router.get("/logout", userController.logoutUser)

router
    .route('/profile')
    .get(checkLogin.LoginReq, userController.profilePage)
    .patch(userController.updateProfile)

module.exports = router