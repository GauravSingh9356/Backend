const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

module.exports = (req, res, next) => {
    try{
        const token = req.query.key;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Unauthorized request'
        });
    }
}