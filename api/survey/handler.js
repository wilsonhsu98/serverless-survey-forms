'use strict';

/*
  // GET /api/v1/surveys/<accountid>/<surveyid>/
  // Authenticated: Not necessary 
  if (event.httpMethod === "GET") {
    // && event.accountid.length>0 && event.surveyid.length>0
  }
  // GET /api/v1/mgnt/surveys/[?startKey=<startKey>]
  // Authenticated: Yes
  else if (event.httpMethod === "GET") {
  }
  // POST /api/v1/mgnt/surveys/
  // Authenticated: Yes
  else if (event.httpMethod === "POST") {
  }
  // PUT /api/v1/mgnt/surveys/
  else if (event.httpMethod === "PUT") {
  }
  // DELETE /api/v1/mgnt/surveys/<surveyid>
  else if (event.httpMethod === "DELETE") {
  }
  else {
//    let error = new Error("400 Bad Request: "+JSON.stringify(event));
//    return callback(error, null);
  }
*/

function dispatcher(event, context, callback) {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));
  
  if (event.apigw.httpMethod === "POST") {
    return callback(null, {
      message: 'POST /api/v1/mgnt/surveys/!',
      request: event
    });
  }

  return callback(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!',
    request: event
  });
};

module.exports.handler = function(event, context, callback) {
  dispatcher(event, context, callback);
};
