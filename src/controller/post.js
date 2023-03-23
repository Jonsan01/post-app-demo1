const fs = require('fs')
const path = require('path')
const postModel = require('./../model/post.model')
const catchAsync = require('../utils/catchAsync')


exports.homePage = catchAsync(async (req, res, next) => {
    const posts = await postModel
        .find({ isDeleted: false })
        .sort('-updatedAt')
        .populate('comment.auther')
        .populate('auther')
    res.render("pages/home", { login: req.isLogin, posts, userId: req?.user?.id, isAdmin: req.isAdmin })
}, "homePage")

exports.createPostForm = (req, res, next) => {
    res.render("pages/createPost", { login: req.isLogin, error: null, isAdmin: req.isAdmin })
}

exports.createPost = catchAsync(async (req, res, next) => {
    await postModel.create({
        auther: req.user.id,
        title: req.body.postTitle,
        content: req.body.postContent,
        media: req.fileNames
    })
    res.redirect("/")
}, "createPost")

exports.MyPostPage = catchAsync(async (req, res, next) => {
    const myPost = await postModel
        .find({ auther: req.user.id })
        .sort('-updatedAt')

    res.render("pages/myPost", { login: true, posts: myPost, userId: req.user.id, isAdmin: req.isAdmin })
}, "myPostPage")

exports.deletePost = catchAsync(async (req, res, next) => {

    if (req.user.id == req.body.userId || req.isAdmin) {

        const post = await postModel.findById(req.body.postId);

        if (!post) throw new Error("Post Not Found...");

        if (post.auther == req.body.userId || req.isAdmin) {

            post.isDeleted = true;
            post.deletedBy = req.body.userId;

            await post.save();

            res.json({ status: 'sucess' })

        } else throw new Error("You Don't have permission")

    } else throw new Error("You Don't have permission")

}, "deletePost")

exports.editPostForm = catchAsync(async (req, res, next) => {
    const post = await postModel.findById(req.params.PostId);

    if (post.auther == req.user.id || req.isAdmin)
        return res.render('pages/editPostForm', { post, login: req.isLogin, error: null, userId: req.user.id, isAdmin: req.isAdmin })
    throw new Error();

}, "editPostForm")

exports.updatePost = catchAsync(async (req, res, next) => {

    const post = await postModel.findById(req.body.postId)

    if (!post || post.isDeleted) throw new Error("post not found");
    if (post.auther == req.user.id || req.isAdmin) {

        post.title = req.body.postTitle;
        post.content = req.body.postContent;
        req.fileNames ||= []
        post.media = [...post.media, ...req.fileNames];
        post.isUpdated = true;
        post.updatedBy = req.user.id;

        await post.save()

        return res.redirect("/")
    }
    throw new Error("You don't have permission...");

}, "updatePost")

exports.removePostImg = catchAsync(async (req, res, next) => {

    const post = await postModel.findById(req.body.postId);

    if (!post || post.isDeleted) throw new Error("Post Not Found...");

    if (post.auther == req.user.id || req.isAdmin) {

        if (!post.media.includes(req.body.imgPath)) throw new Error("Invalid Path");

        post.media.splice(post.media.indexOf(req.body.imgPath), 1);

        await post.save({ timestamps: false })

        fs.unlinkSync(path.join(__dirname, `./../upload/${req.body.imgPath}`));

        return res.json({ status: 'sucess' });

    } throw new Error("You Don't have Permission");
}, "removePostImage")