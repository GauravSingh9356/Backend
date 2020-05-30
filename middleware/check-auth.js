const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}