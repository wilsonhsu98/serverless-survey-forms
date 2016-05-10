'use strict';

let aws = require('aws-sdk');
let user = require('./user');

function dispatcher(event, context, callback) {
  let response = 'Go Serverless! Your Lambda function executed successfully!';

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
    // GET /api/v1/mgnt/users/[?startKey=<startKey>]
    // Authenticated: Yes
    if (event.requester && event.requester.length > 0) {
      response = 'GET /api/v1/mgnt/users/[?startKey=<startKey>] not implement yet.';
    }
  }
  // PUT /api/v1/mgnt/users/
  else if (event.apigw.httpMethod === "PUT") {
    response = 'PUT /api/v1/mgnt/users/ not implement yet.';
    // TODO: invoke updateOneUser once authentication is implemented and enabled
    let obj = new user(aws);
    return obj.addOneUser({
      accountid: event.accountid,
      username: event.username,
      email: event.email
    }, callback);

  }
  // DELETE /api/v1/mgnt/surveys/<surveyid>
  else if (event.apigw.httpMethod === "DELETE") {
    response = 'DELETE /api/v1/mgnt/users/<accountid> not implement yet.';
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