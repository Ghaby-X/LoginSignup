const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    isVerified: Boolean
})

const User = mongoose.model('User', UserSchema);

module.exports = User