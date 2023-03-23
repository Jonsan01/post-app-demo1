const mongoose = require('mongoose');
const commentSchema = require('./comment.schema')

const postSchema = mongoose.Schema({
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    media: {
        type: [String],
        validate: [(val) => val.length >= 1 && val.length <= 10, '{PATH} must have between 1 and 10 items']
    },
    comment: [commentSchema],
    isDeleted: {
        type: Boolean,
        default: false,
        require: true
    },
    isUpdated: {
        type: Boolean,
        default: false,
        require: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

postSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next()
})

postSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'auther',
        select: 'username email'
    })
    next()
})

postSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'comment.auther',
        select: 'username email'
    })
    next()
})

module.exports = postSchema