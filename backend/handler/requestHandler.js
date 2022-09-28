const Products = require('../model/db')


// get all products
const getProducts = async (req,res) => {
    const products = await Products.find({})
    res.status(200).json(products)
    // res.send({hey: "hello"})
}

module.exports = {
    getProducts
}











