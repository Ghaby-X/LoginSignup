// Importing mongoose module
require('dotenv').config();
const mongoose = require("mongoose")


// Database Address
const url = process.env.MONGO_URI

// Connecting to database
mongoose.connect(url).then((ans) => {
console.log("ConnectedSuccessful")
}).catch((err) => {
console.log("Error in the Connection")
})

module.exports = mongoose;