const express = require('express');
const storage = require('./../config/multer');
const validatePost = require('../middelware/validate.post');
const postContoller = require('./../controller/post');
const checkLogin = require('../middelware/login.auth');
const checkAdmin = require('../middelware/admin.auth');


const router = express.Router();

router
    .get("/", checkAdmin,postContoller.homePage)

router
    .route("/createPost")
    .get(checkLogin.LoginReq, postContoller.createPostForm)
    .post(checkLogin.LoginReq, storage.array('postImages'), validatePost.create, postContoller.createPost)
router
    .get("/myposts", checkLogin.LoginReq, postContoller.MyPostPage)
router
    .delete("/post", checkLogin.LoginReq, validatePost.remove, postContoller.deletePost)

router
    .get("/editPost/:PostId", checkLogin.LoginReq, validatePost.editForm, postContoller.editPostForm)

router
    .post("/updatePost", checkLogin.LoginReq, storage.array('postImages'), validatePost.edit, postContoller.updatePost)
    
router
    .delete("/postImg", checkLogin.LoginReq, validatePost.removeImg, postContoller.removePostImg)

module.exports = router