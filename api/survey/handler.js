'use strict';

let aws = require('../config/aws');
let survey = require('./survey');
survey.initAWS(aws);
let user = require('../user/user.js');
user.initAWS(aws);

module.exports.handler = (event, context, callback) => {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  // validate requester role Check if authAccountid is authorized
  const authorizedJudge = new Promise( (resolve, reject) => {
    if(!event.authAccountid){
      reject(new Error("400 Bad Request: " + JSON.stringify(event)));
    } else {
      user.getOneUser({
        accountid: event.authAccountid
      }, function(err, data) {
        if (err) {
          reject(err, null);
        } else {
          // Authorized: Designer or Admin
          if (data.accountid === event.authAccountid && data.role === "Admin" || data.role === "Designer"){
            resolve();
          } else {
            reject(new Error(`403 Unauthorized request： The role of the requester ${event.authAccountid} is ${data.role} ${JSON.stringify(event)}`));
          }
        }
      });
    }
  });

  // A callback handler to decide return is 304 or 200.
  const cacheCallback = (err, response) => {
    if (err) {
      callback(err, response);
    } else if (event.ifModifiedSince && response.datetime && response.datetime === parseInt(event.ifModifiedSince)) {
      return callback("304 Not Modified", null);
    } else {
      const responseData = {};
      responseData.response = response;
      responseData.datetime = (response.datetime) ? response.datetime : Date.now();
      callback(null, responseData);
    }
  };

  switch(event.op) {
    case "getOneSurvey":
      // GET /api/v1/surveys/<accountid>/<surveyid>/
      // Authenticated: Not necessary
      return survey.getOneSurvey({
        accountid: event.accountid,
        surveyid: event.surveyid
      }, cacheCallback);
      break;

    case "listSurveys":
      // GET /api/v1/mgnt/surveys/[?startKey=<startKey>]
      // Authenticated: Yes
      return authorizedJudge.then(() => {
        survey.listSurveys({
          accountid: event.accountid,
          startKey: event.startKey,
        }, cacheCallback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;

    case "addOneSurvey":
      // POST /api/v1/mgnt/surveys/
      // Authenticated: Yes
      return authorizedJudge.then(() => {
         survey.addOneSurvey({
          accountid: event.accountid,
          subject: event.subject,
          survey: event.survey
        }, cacheCallback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;

    case "updateOneSurvey":
      // PUT /api/v1/mgnt/surveys/
      // Authenticated: Yes
      return authorizedJudge.then(() => {
         survey.updateOneSurvey({
          accountid: event.accountid,
          subject: event.subject,
          survey: event.survey,
          surveyid: event.surveyid
        }, cacheCallback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;

    case "deleteOneSurvey":
      // DELETE /api/v1/mgnt/surveys/<surveyid>
      // Authenticated: Yes
      return authorizedJudge.then(() => {
        survey.deleteOneSurvey({
          accountid: event.accountid,
          surveyid: event.surveyid
        }, cacheCallback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;

    default:
      let error = new Error("400 Bad Request: " + JSON.stringify(event));
      return callback(error, null);
  }
};