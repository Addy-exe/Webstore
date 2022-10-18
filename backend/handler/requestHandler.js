const Products = require('../model/db')
const Orders = require('../model/orders')

// get all products
const getProducts = async (req,res) => {
    const products = await Products.find({})
    res.status(200).json(products)
    // res.send({hey: "hello"})
}

// setting orders of user
const setOrders = async (req,res) => {
    const user_id = req.user._id
    const {cart,total} = req.body
    try{
        const order = await Orders.create({user_id,cart,total})
        res.status(200).json({order})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// getting orders from database
const getOrders = async (req,res) => {
    const user_id = req.user._id
    const orders = await Orders.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(orders)
}
 
module.exports = {
    getProducts,
    setOrders,
    getOrders
}











