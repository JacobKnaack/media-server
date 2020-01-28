'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const KEY = process.env.PRIVATE_SECRET;

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

User.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

User.statics.authenticateBasic = function(auth) {
  let query = {email:auth.email};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};

User.statics.authenticateBearer = function(token) {

};

User.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};

User.methods.generateToken = function() {
  let options = { email: this.email };
  return jwt.sign(options, KEY);
};

module.exports = mongoose.model('users', User);
