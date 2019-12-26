'use strict';

const server = require('./src/server');
// configure DB / Cloud services

// start server and configure port
server.start(process.env.PORT || 3000);
