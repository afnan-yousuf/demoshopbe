const mongo = require('mongoose')

const productSchema = mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    cid: Number,
    image: String,
    isactive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongo.model('product', productSchema)