const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const jwt = require("jsonwebtoken");
const fs = require('fs')
//const publicKey = fs.readFileSync('../../jwtRS256.key.pub');


const authUserToken = async (req, res, next) => {
  //middleware
  const token = req.header("Authorization");
  const data = jwt.verify(token, publicKey, {
      algorithm: 'RS256',
      
    });
  
  
  try {
    const user = await Users.findOne({ _id: data });
    console.log(user, "hola");
    if (!user) {
      throw new Error("Not authorized to acces this resource");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ msg: error.msg });
  }
};


//   const authUserToken  =  (req, res, next) => {
//      req.header('Authorization');
//   if (!authUserToken) return res.status(401).send('Not authorized');

//   const token = _.replace(authUserToken, 'Bearer', '').trim();
//   if (!token) return res.status(401).send('Not authorized');
  
//   try {
//     const decoded = jwt.verify(token, publicKey, {
//       algorithm: 'RS256',
      
//     });
//     req.users = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).send('Not authorized');
//   }
// };
 module.exports = authUserToken;