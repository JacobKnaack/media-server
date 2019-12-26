'use strict';

require('dotenv').config();
const AWS = require('aws-sdk');
const stream = require('stream');

const s3 = new AWS.S3();

function uploadFromStream(key) {
  const pass = new stream.PassThrough();

  const params = {Bucket: process.env.AWS_S3_BUCKET, Key: key, Body: pass};
  s3.upload(params, function(err, data) {
    if (err) {
      console.error(err);
      return err;
    } else {
      console.log('Object uploaded :', data);
    }
  });

  return pass;
}

module.exports = {
  uploadFromStream,
};
