'use strict';

require('dotenv').config();
const ps = require('ps-list');
const mongoose = require('mongoose');
const server = require('./src/server');

// configure DB / Cloud services
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// start server and configure port
server.start(process.env.PORT || 3000);

// kill mongod process on signal interrupt, and make sure node is shut down.
process.on('SIGINT', function() {
  console.log('\n *** Gracefully shutting down server. ***');
  ps().then(list => {
    list.forEach(item => {
      if(item.cmd === 'mongod --dbpath ./db --fork --logpath ./db/db.startup.log') {
        console.log('Shutting down mongod : process ', item.pid);
        process.kill(item.pid);
      }
    });
    process.exit();
  }).catch((e) => {
    console.log('ERROR: ', e);
    process.exit();
  });
});
