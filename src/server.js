'use strict';

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const Busboy = require('busboy');
const app = express();

const authRouter = require('./router/auth');
const mediaRouter = require('./router/media');

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRouter);
app.use('/media', mediaRouter);


app.post('/compress', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    file.pipe(compressFromStream(filename));
  });

  busboy.on('finish', function() {
    res.writeHead(200, { 'Connection': 'close' });
    res.end("File Uploaded!!");
  });

  return req.pipe(busboy);
});

// streaming functionality from https://jsonworld.com/demo/video-streaming-with-nodejs
// author Suraj Roy
app.get('/media/:mediaId', function (req, res) {
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
    };

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
});

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () =>{
      console.log('App is running on port :', port);
    });
  },
};
