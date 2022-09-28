const express = require('express')
const { getProducts } = require('../handler/requestHandler')
// getting user routes handler
const { loginUser , signupUser } = require('../handler/userHandler')


// creating instance of router
const routes = express.Router()

routes.post('/login',loginUser)

routes.post('/signup',signupUser)

routes.get('/',getProducts)

module.exports = routes
