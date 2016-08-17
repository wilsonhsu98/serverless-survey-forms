'use strict';
let aws = require('../config/aws');
let feedback = require('../feedback/feedback.js');
feedback.initAWS(aws);
let survey = require('../survey/survey.js');
survey.initAWS(aws);
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
          if (data.role === "Admin" || data.role === "Designer"){
            resolve();
          } else {
            reject(new Error(`403 Unauthorized request: The role of the requester ${event.authAccountid} is ${data.role}`));
          }
        }
      });
    }
  });

  switch (event.op){
    case "reportFeedbacks":
      // GET /api/v1/mgnt/report/{accountid}/{surveyid}
      // Authenticated: Yes
      return authorizedJudge.then( () => {
        feedback.reportFeedbacks({
          accountid: event.accountid,
          surveyid: event.surveyid,
        }, callback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;

    default:
      let error = new Error("400 Bad Request: " + JSON.stringify(event));
      return callback(error, null);
  }
};
