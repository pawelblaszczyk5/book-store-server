const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject();
      } else {
        resolve(hash);
      }
    });
  })
}

module.exports.comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  })
}

module.exports.generateJWT = (data) => {
  return jwt.sign(data, process.env.SECRET, {expiresIn: '7d'});
}

module.exports.verifyJWT = (jwtToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, process.env.SECRET, function(err, decoded) {
      if (err) {
        reject(false);
      } else {
        resolve(decoded);
      }
    });
  })
}
