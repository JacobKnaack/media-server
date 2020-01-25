'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const KEY = process.env.PRIVATE_SECRET;

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

User.pre('save', async () => {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

User.statics.authenticateBasic = () => {

};

User.statics.authenticateBearer = () => {

};

User.methods.generateToken = () => {
  let options = { email: this.email };
  let token = jwt.sign(options, KEY);
  return token;
};

module.exports = mongoose.model('users', User);
