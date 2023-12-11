const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
    country: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    }
})


const user = new mongoose.model("users", userSchema)

module.exports = user;