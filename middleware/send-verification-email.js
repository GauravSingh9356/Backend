require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');

const send = require('gmail-send')({
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    subject: 'verification mail',
  });

  module.exports = (toemail) => {

    const activation_token = jwt.sign({email: toemail}, process.env.JWT_KEY, {expiresIn: "1h"});
    const address = `http://localhost:3000/register/activate?key=${activation_token}`;

    send({
        to: toemail,  
        text: address,  
      }, 
      (error, result, fullResult) => {
        if (error) {
            console.error(error);
        }
        console.log(result);
      });

}
  
