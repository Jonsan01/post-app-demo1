const { default: mongoose } = require('mongoose');
const roleSchema = require('./role.schema');

module.exports = mongoose.model('role', roleSchema)