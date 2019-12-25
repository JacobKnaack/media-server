'use strict';

const path = require('path');
const ffmpeg = require('ffmpeg');
const NodeMediaServer = require('node-media-server');

// const compress = require('./compress');
const streamPATH = path.resolve('../../../Movies/Suspiria.2018.WEBRip.1080p.YTS.AM/Suspiria.2018.1080p.WEBRip.x264-[YTS.AM].mp4');

// compress(streamPATH)
// .then(console.log);

// Configuration object for node-media-server
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: '../media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=faststart]',
      }
    ]
  }
};

// try {
//   const process = new ffmpeg(streamPATH);
//   process.then(video => {
//     console.log(video);
//   })
// } catch (e) {
//   console.log(e.code);
//   console.log(e.msg);
// }

var nms = new NodeMediaServer(config)
nms.run();