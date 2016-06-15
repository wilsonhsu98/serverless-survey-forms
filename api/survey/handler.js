'use strict';

let aws = require('aws-sdk');
let survey = require('./survey');

function dispatcher(event, context, callback) {
  let response = 'Go Serverless! Your Lambda function executed successfully!';

  //console.log(event.op);
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  // AWS set region
  if (process.env.SERVERLESS_REGION) {
    console.log("set region to", process.env.SERVERLESS_REGION);
    aws.config.update({
      region: process.env.SERVERLESS_REGION
    });
  }

  // GET
  if (event.apigw.httpMethod === "GET") {
    // GET /api/v1/surveys/<accountid>/<surveyid>/
    // Authenticated: Not necessary 
    if (event.accountid && event.surveyid &&
      event.accountid.length > 0 && event.surveyid.length > 0) {
      response = 'GET /api/v1/surveys/<accountid>/<surveyid>/ not implement yet.';
      let obj = new survey(aws);
      return obj.getOneSurvey({
        accountid: event.accountid,
        surveyid: event.surveyid
      }, callback);
    }
    // GET /api/v1/mgnt/surveys/[?startKey=<startKey>]
    // Authenticated: Yes
    else if (event.requester && event.requester.length > 0) {
      response = 'GET /api/v1/mgnt/surveys/[?startKey=<startKey>] not implement yet.';
    }
  }
  // POST /api/v1/mgnt/surveys/
  // Authenticated: Yes
  else if (event.apigw.httpMethod === "POST") {
    response = 'POST /api/v1/mgnt/surveys/ not implement yet.';
    // TODO: validate requester role
    let obj = new survey(aws);
    return obj.addOneSurvey({
      accountid: event.requester,
      subject: event.subject,
      survey: event.survey
    }, callback);
  }
  // PUT /api/v1/mgnt/surveys/
  else if (event.apigw.httpMethod === "PUT") {
    response = 'PUT /api/v1/mgnt/surveys/ not implement yet.';
  }
  // DELETE /api/v1/mgnt/surveys/<surveyid>
  else if (event.apigw.httpMethod === "DELETE") {
    response = 'DELETE /api/v1/mgnt/surveys/<surveyid> not implement yet.';
  } else {
    let error = new Error("400 Bad Request: " + JSON.stringify(event));
    return callback(error, null);
  }

  return callback(null, {
    message: response,
    request: event
  });
};

module.exports.handler = function(event, context, callback) {
  dispatcher(event, context, callback);
};