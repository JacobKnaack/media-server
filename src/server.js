'use strict';

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
// const AWS = require('aws-sdk');
const compression = require('compression');
const multer = require('multer');
const Busboy = require('busboy');
const app = express();
const upload = multer();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

function uploadFromStream(s3) {
  const pass = new stream.PassThrough();

  const params = {Bucket: process.env.AWS_S3_BUCKET, Key: process.env.AWS_S3_KEY, Body: pass};
  s3.upload(params, function(err, data) {
    console.log(err, data);
  });

  return pass;
}

app.post('/upload', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log(fieldname, filename, encoding, mimetype);
    // file.pipe(uploadFromStream(s3));
  });

  busboy.on('finish', function () {
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);
});

// server functionality from https://jsonworld.com/demo/video-streaming-with-nodejs
// author Suraj Roy
app.get('/video/:videoId', function (req, res) {
  const streamPATH = path.resolve(process.env.UNSAFE_STREAM_PATH);
  const stat = fs.statSync(streamPATH);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(streamPATH, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head);
    fs.createReadStream(streamPATH).pipe(res);
  }
})

app.listen(3000, function () {
  console.log('App is running on port 3000');
});
