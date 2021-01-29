const bcrypt = require('bcrypt');

module.exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject('bad login');
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
        reject('error');
      } else {
        resolve(result);
      }
    });
  })
}
