const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
require('dotenv').config();
const User = require('../models/user');

router.post('/', (req, res) => {
    User.find({email: req.body.email })
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        else {
            bcrypt.compare(req.body.password, user[0].password, (err, hash) => {
                if(err){
                    return res.status(401).json({
                        messagae: 'Auth failed'
                    });
                }
                else {
                    if (!user[0].emailVerified) {
                        return res.status(500).json({ message: 'User not activated' });
                    }
                    else {
                        const token = jwt.sign(
                            {
                                username: user[0].username,
                                userId: user[0]._id,
                                userRole: user[0].userRole
                            },
                            process.env.JWT_ACCESS_TOKEN,
                            {
                                expiresIn: "10h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        });
                    }
                }
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})


module.exports = router