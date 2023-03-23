const express = require('express');
const validateComment = require('../middelware/validate.comment');
const commentController = require('./../controller/comment');
const checkLogin = require('../middelware/login.auth')

const router = express.Router();

router
    .route("/comment")
    .post(checkLogin.LoginReq, validateComment.create, commentController.createComment)
    .patch(checkLogin.LoginReq, validateComment.update, commentController.updateComment)
    .delete(checkLogin.LoginReq, validateComment.remove, commentController.deleteComment)

module.exports = router