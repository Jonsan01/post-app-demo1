const { default: mongoose } = require('mongoose');
const postSchema = require('./post.schema');

module.exports = mongoose.model('post', postSchema)