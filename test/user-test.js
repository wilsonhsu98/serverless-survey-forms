'use strict';

let expect = require('chai').expect;
let should = require('chai').should();

// require testing target and set up necessary information
let aws = require('aws-sdk');
let user = require('../api/user/user.js');
/*
before('Initial local DynamoDB', function(done) {
  // set up necessary information
  process.env['SERVERLESS_USERTABLE'] = 'usertable';
  /////////////////////////////////////////////////////////////////////

  // Returns a standard Node.js HTTP server
  let dynalitePort = 4567;
  let dynalite = require('dynalite'),
    dynaliteServer = dynalite({
      createTableMs: 0
    });

  // Listen on port dynalitePort
  dynaliteServer.listen(dynalitePort, function(err) {
    if (err) throw err;
    //console.log('Dynalite started on port ' + dynalitePort)

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
      }, {
        AttributeName: "userid",
        AttributeType: "S"
      }],
      KeySchema: [{
        AttributeName: "accountid",
        KeyType: "HASH"
      }, {
        AttributeName: "userid",
        KeyType: "RANGE"
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
  })
  /////////////////////////////////////////////////////////////////////
});
*/
describe("Interface to add one new user model into data store successfully", function() {
  describe("#addOneUser", function() {
    describe("When adding one new user model with complete and normal parameters", function() {
      it("should response successfully");
    });
  });
});

describe("Interface to add one new user model into data store with error", function() {
  describe("#addOneUser", function() {

    // missing parameter(s)
    let missingParams = [
      // one parameter
      {
        desc: "with missing event.user",
        event: {
          accountid: "this is fake account",
          subject: "this is fake subject"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.subject",
        event: {
          accountid: "this is fake account",
          user: "this is fake user model"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid",
        event: {
          subject: "this is fake subject",
          user: "this is fake user model"
        },
        expect: /Error: 400 Bad Request/
      },
      // two parameters
      {
        desc: "with missing event.subject and event.user",
        event: {
          accountid: "this is fake account"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid and event.user",
        event: {
          subject: "this is fake subject"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid and event.subject",
        event: {
          user: "this is fake user model"
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
        it("should response error");
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