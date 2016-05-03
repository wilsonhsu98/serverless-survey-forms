'use strict';

let assert = require('chai').assert;
let expect = require('chai').expect;
let should = require('chai').should();

// require testing target and set up necessary information
let aws = require('aws-sdk');
let survey = require('../api/survey/survey.js');

before('Initial local DynamoDB', function(done) {
  // set up necessary information
  process.env['SERVERLESS_SURVEYTABLE'] = 'surveytable';
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

    // create survey table
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
      TableName: process.env.SERVERLESS_SURVEYTABLE,
      AttributeDefinitions: [{
        AttributeName: "accountid",
        AttributeType: "S"
      }, {
        AttributeName: "surveyid",
        AttributeType: "S"
      }],
      KeySchema: [{
        AttributeName: "accountid",
        KeyType: "HASH"
      }, {
        AttributeName: "surveyid",
        KeyType: "RANGE"
      }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    };
    dynamodb.createTable(params, function(err, data) {
      if (err) throw err
    });

    done();
  })
  /////////////////////////////////////////////////////////////////////
});

describe("Given a survey module, ", function() {
  context("add one new survey model in to data store", function() {
    specify("with complete and normal parameters", function(done) {
      let obj = new survey(aws);
      let event = {
        accountid: "this is fake account",
        subject: "this is fake subject",
        survey: "this is fake survey model"
      };
      obj.addOneSurvey(event, function(error, response) {
        expect(error).to.be.null;
        expect(response).to.not.be.null;
        done();
      });
    });

    // missing parameter(s)
    let missingParams = [
      // one parameter
      {
        desc: "with missing event.survey",
        event: {
          accountid: "this is fake account",
          subject: "this is fake subject"
        }
      }, {
        desc: "with missing event.subject",
        event: {
          accountid: "this is fake account",
          survey: "this is fake survey model"
        }
      }, {
        desc: "with missing event.accountid",
        event: {
          subject: "this is fake subject",
          survey: "this is fake survey model"
        }
      },
      // two parameters
      {
        desc: "with missing event.subject and event.survey",
        event: {
          accountid: "this is fake account"
        }
      }, {
        desc: "with missing event.accountid and event.survey",
        event: {
          subject: "this is fake subject"
        }
      }, {
        desc: "with missing event.accountid and event.subject",
        event: {
          survey: "this is fake survey model"
        }
      },
      // all parameters
      {
        desc: "with missing all parameters",
        event: {}
      }
    ];

    missingParams.forEach(function(test) {
      specify(test.desc, function(done) {
        let obj = new survey(aws);
        obj.addOneSurvey(test.event, function(error, response) {
          expect(error).to.not.be.null;
          expect(response).to.be.null;
          error.should.match(/Error: 400 Bad Request/)
          done();
        });
      });
    });
  });
});

describe("Given a survey module", function() {
  context("Get one survey model from data store", function() {
    specify("get with non-exist account id and survey id", function(done) {
      let obj = new survey(aws);
      let event = {
        accountid: "this is fake account",
        surveyid: "non-exist survey id"
      };
      console.log(event);
      obj.getOneSurvey(event, function(error, response) {
        expect(error).to.not.be.null;
        expect(response).to.be.null;
        done();
      });
    });
  });
});