const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'role',
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
    next()
})

userSchema.pre(/^find/, function (next) {
    this.select("-__v")
    next()
})

userSchema.pre(/^find/, function (next) {
    this.populate({
        path: "role",
        select: "name -_id"
    })
    next()
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = userSchema