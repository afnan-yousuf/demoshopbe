const mongo = require('mongoose')

const categorySchema = mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    isactive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongo.model('category', categorySchema)