'use strict';

const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const { uploadFromStream, fetchBucketContents } = require('../storage');


// uploads a file to the configured S3 bucket
router.get('/upload', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log(fieldname, filename, encoding, mimetype);
    file.pipe(uploadFromStream(filename));
  });

  busboy.on('finish', function () {
    res.writeHead(200, { 'Connection': 'close' });
    res.end("File Uploaded!!");
  });
  return req.pipe(busboy);
});

// fetches all objects from the configured S3 bucket
router.get('/list', (req, res, next) => {
  fetchBucketContents()
    .then(data => res.json(data))
    .catch(err => next(err));
});


module.exports = router;
