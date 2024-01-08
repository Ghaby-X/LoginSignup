const mongoose = require('../config/db')

const UserVerificationSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiredAt: Date
})

const UserVerification = mongoose.model('UserVerificaiton', UserVerificationSchema);

module.exports = UserVerification