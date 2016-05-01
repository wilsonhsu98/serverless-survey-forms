'use strict';

var assert = require('chai').assert;

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

dynamodb.listTables(console.log.bind(console));

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(5));
      assert.equal(-1, [1, 2, 3].indexOf(0));
    });
  });
});

describe("Given a survey module", function() {
  describe("Add one new survey model in to data store", function() {
    it("add with complete and normal parameters", function() {
      let obj = new survey(aws);
      let event = {
        accountid: "this is fake account",
        subject: "this is fake subject",
        survey: "this is fake survey model"
      };
      obj.addOneSurvey(event, function(error, response) {
        console.log(error);
        console.log(response);
        obj.getOneSurvey(response, function(error, response) {
          console.log(error);
          console.log(response);
          done();
        })
      });
    });
  });
  describe("Get one survey model from data store", function() {
    it("get with non-exist account id and survey id", function() {
      let obj = new survey(aws);
      let event = {
        accountid: "this is fake account",
        surveyid: "non-exist survey id"
      };
      obj.getOneSurvey(event, function(error, response) {
        console.log(error);
        console.log(response);
        done();
      });
    });
  });
});