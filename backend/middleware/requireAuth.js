const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // get the token form request header i.e: `Bearer dregtyiwdwn.nifbtbuw.pajihbf` get second part using split method

    const token = authorization.split(' ')[1]

    try {
        // verify token with SECRET and grab id from payload
        const { _id } = jwt.verify(token, process.env.SECRET)

        // just get id of user from backend not email or hash password : .select('_id')
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth