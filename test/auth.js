'use strict';

require('dotenv').config();
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const server = require('../src/server.js');
const request = supertest(server.app);
const MockDB = require('./mongo-mock');
const { expect } = require('chai');

describe('Authentication features', () => {

  before(MockDB.startDB);
  after(MockDB.stopDB);
  const testUser = {
    email: 'test@test.com',
    password: 'testtesttest',
  };

  it ('User should be able to register with the platform', (done) => {
    request.post('/signup')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(testUser)
      .then(response => {
        const token = jwt.verify(response.text, process.env.PRIVATE_SECRET);
        expect(token.email).to.equal(testUser.email);
        done();
      }).catch(done);
  });

  it ('User should be able to log back in to the platform', (done) => {
    request.post('/signin')
      .auth(testUser.email, testUser.password)
      .then(results => {
        const token = jwt.verify(results.text, process.env.PRIVATE_SECRET);
        expect(token.email).to.equal(testUser.email);
        done();
      }).catch(done);
  });
});

