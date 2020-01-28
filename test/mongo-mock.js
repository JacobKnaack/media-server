'use strict';

const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').default;

let mongoServer;

module.exports = {

  startDB: async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    const mongooseOptions = {
      useNewUrlParser:true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoUri, mongooseOptions, (err) => {
      if (err) console.error(err);
    });
  },

  stopDB: () => {
    mongoose.disconnect();
    mongoServer.stop();
  },

};
