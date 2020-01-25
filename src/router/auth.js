'use strict';

const express = require('express');
const router = express.Router();

router.post('/signin', (req, res, next) => res.send('Signin route'));
router.post('/signup', (req, res, next) => res.send('Signup route'));

module.exports = router;
