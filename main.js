/**
 * Entry point of application
 */


const express = require('express')
const app = express()


//Middlewares
app.use(express.json())
app.use(express.static('public/'))


//Routes
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')


app.use('/v1/login', loginRoute)
app.use('/v1/register', registerRoute)


app.listen(80, ()=> console.log("Server Up"))
