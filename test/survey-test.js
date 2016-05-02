'use strict';

let assert = require('chai').assert;
let expect = require('chai').expect;
let should = require('chai').should();

// require testing target and set up necessary information
var aws = require('aws-sdk');
var survey = require('../api/survey/survey.js');
process.env['SERVERLESS_SURVEYTABLE'] = 'surveytable';
/////////////////////////////////////////////////////////////////////

// Returns a standard Node.js HTTP server
var dynalite = require('dynalite'),
  dynaliteServer = dynalite({
    createTableMs: 0
  });

// Listen on port 4567
dynaliteServer.listen(4567, function(err) {
  if (err) throw err
  console.log('Dynalite started on port 4567')
})
/////////////////////////////////////////////////////////////////////

aws.config.update({
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey",
  region: 'us-east-1',
  endpoint: 'http://localhost:4567'
});
var dynamodb = new aws.DynamoDB({
  apiVersion: '2012-08-10'
});

//
var params = {
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
  ProvisionedThroughput: { /* required */
    ReadCapacityUnits: 5,
    /* required */
    WriteCapacityUnits: 5 /* required */
  }
};
dynamodb.createTable(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
});
//

//dynamodb.listTables(console.log.bind(console));

describe("Given a survey module", function() {
  context("Add one new survey model in to data store", function() {
    specify("add with complete and normal parameters", function(done) {
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
  });

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
/*
describe('Array', function() {
  context('#indexOf()', function() {
    specify('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(5));
      assert.equal(-1, [1, 2, 3].indexOf(0));
      ([1, 2, 3].indexOf(0)).should.equal(0);
    });

    it('should do something', function(done) {
      setTimeout(function() {
        expect(true).to.equal(false);
        done();
      }, 100);
    });
  });
});
*/