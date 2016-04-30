var assert = require('chai').assert;
var aws = require('aws-sdk');
var survey = require('../api/survey/survey.js');

process.env['SERVERLESS_SURVEYTABLE'] = 'surveytable';

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe("Given a survey module", function() {
  describe("Add one new survey model in to data store", function() {
    it("add with complete and normal parameters", function() {
      obj = new survey(aws);
      var event = {
        accountid: 'this is fake account',
        subject: 'this is fake subject',
        survey: 'this is fake survey model'
      };
/*
      obj.addOneSurvey(event, function(error, response) {
        console.log(error);
        console.log(response);
      });
*/
    });
  });
});

