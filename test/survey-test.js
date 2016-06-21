'use strict';

let expect = require('chai').expect;
let should = require('chai').should();

// require testing target and set up necessary information
let aws = require('aws-sdk');
let survey = require('../api/survey/survey.js');
let dynadblib = require('./dynadb');
let dynadb = new dynadblib();

before('Initial local DynamoDB', function(done) {
  // set up necessary information
  process.env['SERVERLESS_SURVEYTABLE'] = 'surveytable';
  let dynalitePort = 1234;
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
      if (err) throw err;
      done();
    });
  });
  /////////////////////////////////////////////////////////////////////
});

after('Uninitial local DynamoDB', function(done) {
  dynadb.close(done);
});

describe("Interface to add one new survey model into data store successfully", function() {
  describe("#addOneSurvey", function() {
    describe("When adding one new survey model with complete and normal parameters", function() {
      it("should response successfully", function(done) {
        //let obj = new survey(aws);
        let event = {
          accountid: "this is fake account",
          subject: "this is fake subject",
          survey: "this is fake survey model"
        };
        survey.addOneSurvey(event, function(error, response) {
          expect(error).to.be.null;
          expect(response).to.not.be.null;
          response.should.have.all.keys(['accountid', 'surveyid', 'datetime']);
          response.accountid.should.have.string(event.accountid);
          response.surveyid.should.have.length.above(0);
          response.datetime.should.be.above(0);
          done();
        });
      });
    });
  });
});

describe("Interface to add one new survey model into data store with error", function() {
  describe("#addOneSurvey", function() {

    // missing parameter(s)
    let missingParams = [
      // one parameter
      {
        desc: "with missing event.survey",
        event: {
          accountid: "this is fake account",
          subject: "this is fake subject"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.subject",
        event: {
          accountid: "this is fake account",
          survey: "this is fake survey model"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid",
        event: {
          subject: "this is fake subject",
          survey: "this is fake survey model"
        },
        expect: /Error: 400 Bad Request/
      },
      // two parameters
      {
        desc: "with missing event.subject and event.survey",
        event: {
          accountid: "this is fake account"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid and event.survey",
        event: {
          subject: "this is fake subject"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid and event.subject",
        event: {
          survey: "this is fake survey model"
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
      describe("When adding one new survey model " + test.desc, function() {
        it("should response error", function(done) {
          //let obj = new survey(aws);
          survey.addOneSurvey(test.event, function(error, response) {
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

describe("Interface to get one survey model from data store successfully", function() {
  let accountid = "this is fake account";
  let subject = "this is fake subject";
  let surveymodel = "this is fake survey model";
  let surveyid = null;

  before("Insert one dummy record", function(done) {
    //let obj = new survey(aws);
    let event = {
      accountid: accountid,
      subject: subject,
      survey: surveymodel
    };
    survey.addOneSurvey(event, function(err, data) {
      if (err) throw err;
      surveyid = data.surveyid;
      done();
    });
  });

  describe("#getOneSurvey", function() {
    describe("When getting exist survey model with complete and normal parameters", function() {
      it("should response successfully", function(done) {
        //let obj = new survey(aws);
        let event = {
          accountid: accountid,
          surveyid: surveyid
        };
        survey.getOneSurvey(event, function(error, response) {
          expect(error).to.be.null;
          expect(response).to.not.be.null;
          response.should.have.all.keys(['accountid', 'surveyid', 'subject', 'datetime', 'survey']);
          response.accountid.should.have.string(accountid);
          response.surveyid.should.have.string(surveyid);
          response.subject.should.have.string(subject);
          response.survey.should.have.string(surveymodel);
          response.datetime.should.be.above(0);
          done();
        });
      });
    });
  });
});

describe("Interface to get one survey model from data store with error", function() {
  describe("#getOneSurvey", function() {

    // missing parameter(s)
    let missingParams = [
      // one parameter
      {
        desc: "with missing event.surveyid",
        event: {
          accountid: "this is fake account"
        },
        expect: /Error: 400 Bad Request/
      }, {
        desc: "with missing event.accountid",
        event: {
          surveyid: "this is fake survey id"
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
      describe("When getting one survey model " + test.desc, function() {
        it("should response error", function(done) {
          //let obj = new survey(aws);
          survey.getOneSurvey(test.event, function(error, response) {
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