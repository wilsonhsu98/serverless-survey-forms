'use strict';

let aws = require('../config/aws');
let survey = require('./survey');

module.exports.handler = (event, context, callback) => {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  survey.initAWS(aws);
  switch(event.op) {
    case "getOneSurvey":
      // GET /api/v1/surveys/<accountid>/<surveyid>/
      // Authenticated: Not necessary
      return survey.getOneSurvey({
        accountid: event.accountid,
        surveyid: event.surveyid
      }, callback);
      break;

    case "listSurveys":
      // GET /api/v1/mgnt/surveys/[?startKey=<startKey>]
      // Authenticated: Yes
      // TODO: validate requester role
      return survey.listSurveys({
        accountid: event.accountid,
        authAccountid: event.authAccountid,
        startKey: event.startKey,
      }, callback );
      break;

    case "updateOneSurvey":
      // PUT /api/v1/mgnt/surveys/
      break;

    case "addOneSurvey":
      // POST /api/v1/mgnt/surveys/
      // Authenticated: Yes
      // TODO: validate requester role
      return survey.addOneSurvey({
        accountid: event.requester,
        subject: event.subject,
        survey: event.survey
      }, callback);
      break;

    case "deleteOneSurvey":
      // DELETE /api/v1/mgnt/surveys/<surveyid>
      break;

    default:
      let error = new Error("400 Bad Request: " + JSON.stringify(event));
      return callback(error, null);
  }
};