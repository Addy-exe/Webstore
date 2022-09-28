const mongoose = require('mongoose')
// package for hashing of passwords
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static validation signup method
userSchema.statics.signup = async function(email,password){

    // validate that email password is not empty
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    // validate for proper email
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({ email })
    if(exists){ 
        throw Error('Email already in use')
    }
    // salt attaches extra random string to password 
    const salt = await bcrypt.genSalt(10)
    // hashing of password
    const hash = await bcrypt.hash(password,salt)
    // create document
    const user = await this.create({email,password: hash})

    return user
}

// static login method
userSchema.statics.login = async function(email,password){
    // validate that email password is not empty
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    // search for the user in db with email
    const user = await this.findOne({ email })
    if(!user){ 
        throw Error('Incorrect email')
    }
    // comparing hashes for db and current password
    const match = await bcrypt.compare(password,user.password)
    // if match then return that user 
    if(!match){
        throw Error("Incorrect password")
    }
    return user
}

module.exports = mongoose.model('User',userSchema)