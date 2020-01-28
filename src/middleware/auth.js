'use strict';

const User = require('../model/user');

module.exports = {
  basic: (req, res, next) => {
    const authString = req.headers.authorization.split(' ')[1];
    const base64Buffer = Buffer.from(authString, 'base64');
    const bufferString = base64Buffer.toString();
    const [email, password] = bufferString.split(':');

    return User.authenticateBasic({email, password})
      .then(user => {
        if (user) {
          req.user = user;
          req.token = user.generateToken();
          next();
        } else {
          next("Invalid User");
        }
      }).catch(next);
  },
  bearer: (req, res, next) => {
    const authString = req.headers.authorization.split(' ')[1];
    return User.authenticateToken(authString)
      .then( user => {
        if (user) {
          req.user = user;
          req.token = user.generateToken();
          next();
        } else {
          next('Invalid User');
        }
      })
      .catch(next);
  },
};
