const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    cart: {
        type: Array
    },
    total: {
        type: Number
    }
},{ timestamps: true })

module.exports = mongoose.model('Orders',orderSchema)