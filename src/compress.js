'use strict';

/**
 * Takes a path and returns a compressed version of the file.
 */

const fs = require('fs');
const stream = require('stream');
const zlib = require('zlib');

function compressFromStream() {
  const pass = new stream.PassThrough();

}

module.exports = (path) => {
  let result = [];
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path);
    readStream.on('data', chunk => {
      console.log(chunk);
      result.push(zlib.createGzip(chunk));
    });
    readStream.on('error', () => {
      reject('compression failed');
    })
    readStream.on('end', () => {
      resolve(result);
    });
  });
}
