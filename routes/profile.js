const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

router.get('/:username', checkAuth, (req, res, next) => {
    res.status(200).json({
        message: 'return user public profile data'
    });
});

router.patch('/:username/edit',checkAuth, (req, res, next) => {
    User.find({username: req.params.username })
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'User not found' 
            });
        }
        else {
            if(req.userData.username == req.params.username) {
                return res.status(200).json({
                    message: 'you can edit your profile here' 
                });
            }
            else {
                return res.status(401).json({
                    message: 'permission denied' 
                });
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });   
    
});



module.exports = router;