const postModel = require('./../model/post.model')
const commentSchema = require('../model/comment.schema')
const mongoose = require('mongoose')
const catchAsync = require('../utils/catchAsync')

exports.createComment = catchAsync(async (req, res, next) => {

    if (req.user.id != req.body.userId) throw new Error("You don't have permission...");

    const comment = new mongoose.Document({
        auther: req.user.id,
        content: req.body.content
    }, commentSchema)

    const post = await postModel.findById(req.body.postId);

    if (!post) throw new Error("Post Not Found...");
    post.comment = [...post.comment, comment]
    await post.save({ timestamps: false })

    res.status(200).json({ status: 'sucess' })
}, "createComment")

exports.updateComment = catchAsync(async (req, res, next) => {

    if (req.user.id == req.body.userId || req.isAdmin) {
        const post = await postModel.findById(req.body.postId).populate('comment.auther');

        if (!post) throw new Error("Post Not Found...")

        const comment = post.comment.find(e => e.id == req.body.commentId)

        if(!comment) throw new Error("Commnet Not Found...");

        if (comment.auther.id == req.body.userId || req.isAdmin) {

            comment.content = req.body.content;
            comment.isUpdated = true;

            await post.save({ timestamps: false })

            return res.status(200).json({ status: 'sucess' })

        }

        throw new Error("You don't have permission...")

    } else throw new Error("You don't have permission...");
}, "updateComment")

exports.deleteComment = catchAsync(async (req, res, next) => {

    if (req.user.id == req.body.userId || req.isAdmin) {

        const post = await postModel.findById(req.body.postId).populate('auther').populate('comment.auther');

        if (!post) throw new Error("Post Not Found...")

        const comment = post.comment.find(e => (e.id == req.body.commentId))

        if (!comment) throw new Error("Comment Not Found...");

        if (comment.auther.id == req.body.userId || post.auther.id == req.body.userId || req.isAdmin) {

            comment.isDeleted = true;
            comment.isUpdated = true;

            await post.save({ timestamps: false })
            return res.status(200).json({ status: 'sucess' })
        }

        throw new Error("You Don't have permission")
    } else {
        throw new Error("You Don't have permission")
    }

}, "deleteComment")