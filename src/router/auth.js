'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../model/user');

router.post('/signin', auth.basic, (req, res, next) => {
  res.setHeader('token', req.token);
  res.cookie('token', req.token);
  res.send(req.token);
});

router.post('/signup', (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save().then(user => {
    const token = user.generateToken();
    res.setHeader('token', token);
    res.cookie('token', token);
    res.send(token);
  });
});

module.exports = router;
