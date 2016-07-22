'use strict';
let aws = require('../config/aws');
let feedback = require('./feedback');
feedback.initAWS(aws);
let user = require('../user/user.js');
user.initAWS(aws);
module.exports.handler = function(event, context, callback) {
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

  switch (event.op){
    case "getOneFeedback":
      // GET /api/v1/feedbacks/<surveyid>/<clientid>/
      return feedback.getOneFeedback({
        surveyid : event.surveyid,
        clientid : event.clientid,
      }, cacheCallback);
      break;
    case "listFeedbacks":
      // GET /api/v1/mgnt/feedbacks/<surveyid>[?startKey=<startKey>]
      // Authenticated: Yes
      return authorizedJudge.then( () => {
        feedback.listFeedbacks({
          surveyid: event.surveyid,
          startKey: event.startKey
        }, cacheCallback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;
    case "addOneFeedback":
      // POST /api/v1/feedbacks/<surveyid>/<clientid>
      return feedback.addOneFeedback({
        surveyid : event.surveyid,
        clientid : event.clientid,
        feedback: event.feedback
      }, cacheCallback);
      break;
    case "updateOneFeedback":
      // PUT /api/v1/feedbacks/<surveyid>/<clientid>
      return feedback.updateOneFeedback({
        surveyid : event.surveyid,
        clientid : event.clientid,
        feedback: event.feedback
      }, cacheCallback);
      break;
    case "deleteOneFeedback":
      // DELETE /api/v1/feedbacks/<surveyid>/<clientid>/
      return feedback.deleteOneFeedback({
        surveyid : event.surveyid,
        clientid : event.clientid
      }, cacheCallback);
      break;
    default:
      let error = new Error("400 Bad Request: " + JSON.stringify(event));
      return callback(error, null);
  }
};
