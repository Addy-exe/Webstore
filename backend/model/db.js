const mongoose = require('mongoose')

// creating schema for db document 
const Schema = mongoose.Schema

const productSchema = new Schema({
    img: {
        type: Array
    },
    name : {
        type: String,
        required : true
    },
    price : {
        type: String,
        required: true
    },
    lable : {
        type: String
    },
    desc: {
        type: String
    }
},{timestamps : true})

// creating model for interacting with db
module.exports = mongoose.model('Products',productSchema)