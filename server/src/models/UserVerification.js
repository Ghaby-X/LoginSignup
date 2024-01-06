const mongoose = require('mongoose')

const UserVerificationSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String
})

const UserVerification = mongoose.model('UserVerificaiton', UserVerificationSchema);

module.exports = UserVerification