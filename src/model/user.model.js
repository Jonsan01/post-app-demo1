const { default: mongoose } = require('mongoose');
const userSchema = require('./user.schema');

module.exports = mongoose.model('user', userSchema)