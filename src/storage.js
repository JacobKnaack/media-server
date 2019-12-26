'use strict';

/**
 * Functions for interfacing with s3 Storage services
 */

require('dotenv').config();
const AWS = require('aws-sdk');
const stream = require('stream');

const s3 = new AWS.S3();

/**
 *
 * @param {String} key - The name that s3 uses in the configures bucket.
 * @returns {module:stream.internal.PassThrough}
 */
function uploadFromStream(key) {
  const pass = new stream.PassThrough();

  s3.upload(
    {Bucket: process.env.AWS_S3_BUCKET, Key: key, Body: pass},
    (err, data) => {
    if (err) {
      console.error(err);
      return err;
    } else {
      console.log('Object uploaded :', data);
    }
  });

  return pass;
}

/**
 * Fetches all objects from the configured s3 bucket.
 * @returns {Promise<unknown>}
 */
function fetchBucketContents() {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(
      { Bucket: process.env.AWS_S3_BUCKET, MaxKeys: 30},
      (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log('**** Objects retrieved ****', data);
          resolve(data.contents);
        }
      });
  });
}

function fetchObject() {

}

module.exports = {
  uploadFromStream,
  fetchBucketContents,
};
