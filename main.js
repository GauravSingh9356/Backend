const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Database connectivity
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URI, ()=> console.log("Db Up"))
.catch(err => console.log(err));


//Routes
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');


app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/profile', profileRoute);
app.get('/qwe', (req, res) => {
    res.send('hello');
})


app.listen(3000, ()=> console.log("Server Up"));
