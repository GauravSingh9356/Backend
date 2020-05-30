const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path: '.env' });

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Database connectivity
mongoose.connect("mongodb://localhost:27017",
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true},
    (err)=> {
        if(err) throw err;
        console.log("DB UP")
    })


//Routes
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');


app.use('/v1/login', loginRoute);
app.use('/v1/register', registerRoute);
app.use('/v1/profile', profileRoute);
app.get('/qwe', (req, res) => {
    res.send('hello');
})


app.listen(3000, ()=> console.log("Server Up"));
