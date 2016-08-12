'use strict';
let aws = require('../config/aws');
let feedback = require('../feedback/feedback.js');
feedback.initAWS(aws);
let survey = require('../survey/survey.js');
survey.initAWS(aws);
module.exports.handler = function(event, context, callback) {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  switch (event.op){
    case "reportFeedbacks":
    // GET /api/v1/mgnt/report/{accountid}/{surveyid}
    // Authenticated: Yes
    feedback.reportFeedbacks({
      accountid: event.accountid,
      surveyid: event.surveyid,
    }, callback);
    break;

    default:
      let error = new Error("400 Bad Request: " + JSON.stringify(event));
      return callback(error, null);
  }
};
