const mongo = require('mongoose')

const userSchema = mongo.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    dob: String,
    phone: String,
    isvarified: {
        type: Boolean,
        default: false
    },
    isactive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongo.model('user', userSchema)