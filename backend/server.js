require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors')

const app = express()

// middleware req.body handler
app.use(express.json())

// cross platform resource sharing
app.use(
    cors({
        origin: "http://localhost:3000"
    })
)

// required variables
const db = process.env.URL
const port = process.env.PORT

// use routes : link router file 
app.use(routes)

// middleware : process happening between req and res is known as middleware
app.use((req,res,next) => {
    console.log("Inside Middleware",req.path,req.method);
    next();
})

mongoose.connect(db)
.then(() => {
    console.log("connectedto db")
    app.listen(port,() => console.log("Listening on port ",port))
})
.catch((error) => console.log("('-') connection fail",error))


