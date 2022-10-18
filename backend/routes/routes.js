const express = require('express')
const { getProducts , setOrders , getOrders } = require('../handler/requestHandler')
// getting user routes handler
const { loginUser , signupUser } = require('../handler/userHandler')
const requireAuth = require('../middleware/requireAuth')


// creating instance of router
const routes = express.Router()

// Route for user login
routes.post('/login',loginUser)

// Route for user signup
routes.post('/signup',signupUser)
    
// authorized login or user
routes.use(requireAuth)

// Route for order history
routes.post('/payment',setOrders)

// Route for getting all products
routes.get('/',getProducts)

// Route for getting ordered products
routes.get('/order_history',getOrders)

module.exports = routes
