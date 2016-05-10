'use strict';

let expect = require('chai').expect;
let should = require('chai').should();

// require testing target and set up necessary information
let aws = require('aws-sdk');
let user = require('../api/user/user.js');
let dynadblib = require('./dynadb');
let dynadb = new dynadblib();

before('Initial local DynamoDB', function(done) {
  // set up necessary information
  process.env['SERVERLESS_USERTABLE'] = 'usertable';
  let dynalitePort = 4567;
  /////////////////////////////////////////////////////////////////////

  // Returns a standard Node.js HTTP server
  dynadb.listen(dynalitePort, function(err) {
    if (err) throw err;

    // create user table
    aws.config.update({
      accessKeyId: "accessKeyId",
      secretAccessKey: "secretAccessKey",
      region: 'us-east-1',
      endpoint: 'http://localhost:' + dynalitePort
    });
    let dynamodb = new aws.DynamoDB({
      apiVersion: '2012-08-10'
    });

    let params = {
      TableName: process.env.SERVERLESS_USERTABLE,
      AttributeDefinitions: [{
        AttributeName: "accountid",
        AttributeType: "S"
      }],
      KeySchema: [{
        AttributeName: "accountid",
        KeyType: "HASH"
      }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };
    dynamodb.createTable(params, function(err, data) {
      if (err) throw err;
      done();
    });
  });
  /////////////////////////////////////////////////////////////////////
});

after('Uninitial local DynamoDB', function(done) {
  dynadb.close(done);
});

describe("Interface to add one new user model into data store successfully", function() {
  describe("#addOneUser", function() {
    describe("When adding one new user model with complete and normal parameters", function() {
      it("should response successfully", function(done) {
        let obj = new user(aws);
        let event = {
          accountid: "this is fake account",
          username: "this is fake user name",
          email: "this is fake email"
        };
        obj.addOneUser(event, function(error, response) {
          expect(error).to.be.null;
          expect(response).to.not.be.null;
          done();
        });
      });
    });
  });
});

describe("Interface to add one new user model into data store with error", function() {
  describe("#addOneUser", function() {

    // missing parameter(s)
    let missingParams = [
      // one parameter
      {
        desc: "with missing event.email",
        event: {
          accountid: "this is fake account",
          username: "this is fake user name"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.username",
        event: {
          accountid: "this is fake account",
          email: "this is fake email"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid",
        event: {
          username: "this is fake user name",
          email: "this is fake email"
        },
        expect: /Error: 400 Bad Request/
      },
      // two parameters
      {
        desc: "with missing event.username and event.email",
        event: {
          accountid: "this is fake account"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid and event.username",
        event: {
          email: "this is fake email"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid and event.email",
        event: {
          username: "this is fake user name"
        },
        expect: /Error: 400 Bad Request/
      },
      // all parameters
      {
        desc: "with missing all parameters",
        event: {},
        expect: /Error: 400 Bad Request/
      }
    ];

    missingParams.forEach(function(test) {
      describe("When adding one new user model " + test.desc, function() {
        it("should response error", function(done) {
          let obj = new user(aws);
          obj.addOneUser(test.event, function(error, response) {
            expect(error).to.not.be.null;
            expect(response).to.be.null;
            error.should.match(RegExp(test.expect));
            done();
          });
        });
      });
    });
  });
});

describe("Interface to get one user model from data store successfully", function() {
  describe("#getOneUser", function() {
    describe("When getting exist user model with complete and normal parameters", function() {
      it("should response successfully");
    });
  });
});

describe("Interface to get one user model from data store with error", function() {
  describe("#getOneUser", function() {

    // missing parameter(s)
    let missingParams = [
      // one parameter
      {
        desc: "with missing event.userid",
        event: {
          accountid: "this is fake account"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid",
        event: {
          userid: "this is fake user id"
        },
        expect: /Error: 400 Bad Request/
      },
      // all parameters
      {
        desc: "with missing all parameters",
        event: {},
        expect: /Error: 400 Bad Request/
      }
    ];

    missingParams.forEach(function(test) {
      describe("When getting one user model " + test.desc, function() {
        it("should response error");
      });
    });
  });
});