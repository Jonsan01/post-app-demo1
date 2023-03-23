const express = require('express');
const auth = require('../middelware/auth');
const adminAuth = require('../middelware/admin.auth');
const userRouter = require('./user');
const postRouter = require('./post');
const commentRouter = require('./comment');
const adminRouter = require('./admin');

const router = express.Router();

router.use(auth)
router.use(adminAuth)

router.use("/", userRouter);
router.use("/", postRouter);
router.use("/", commentRouter);
router.use("/", adminRouter)

module.exports = router