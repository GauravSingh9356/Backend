const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const checkActivation = require('../middleware/check-activation');
const jwt = require('jsonwebtoken');
const sendmail = require('../middleware/send-verification-email');

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                return res.status(500).json({
                    error: err 
                });
            }
            else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    userRole: req.body.userRole,
                    institute: req.body.institute,
                    username: req.body.username,
                    emailVerified: false
                });

                user.save()
                .then(result => {
                    sendmail(req.body.email);

                    console.log(result);
                    res.status(201).json({
                        message: 'User Created'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                });
            }
       
    });
    
});

router.get('/activate', checkActivation, (req, res, next) => {
    
    User.findOneAndUpdate({email: req.userData.email}, {emailVerified:true}, {returnNewDocument : true})
    .exec()
    .then((user) => {
        const token = jwt.sign(
            {
                username: user.username,
                userId: user._id,
                userRole: user.userRole
            },
            process.env.JWT_KEY,
            {
                expiresIn: "10h"
            }
        );
        return res.status(200).json({
            message: 'Account activated',
            token: token
        });
    })
    .catch((error) => {
        return res.status(401).json({error:error});
      })


});


module.exports = router