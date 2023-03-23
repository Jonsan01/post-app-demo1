const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        require: true
    },
    isUpdated: {
        type: Boolean,
        default: false,
        require: true
    }
}, {
    timestamps: true
})

commentSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next()
})

module.exports = commentSchema