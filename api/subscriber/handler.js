'use strict';

let aws = require('../config/aws');
let subscriber = require('./subscriber')(aws);
let user = require('../user/user.js')(aws);

module.exports.handler = (event, context, callback) => {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  // validate requester role Check if authAccountid is authorized
  const authorizedJudge = new Promise((resolve, reject) => {
    if (!event.authAccountid) {
      reject(new Error("400 Bad Request: " + JSON.stringify(event)));
    } else {
      user.getOneUser({
        accountid: event.authAccountid,
      }).then(data => {
        // Authorized: Designer or Admin
        if (data.role === "Admin" || data.role === "Designer") {
          resolve();
        } else {
          reject(new Error(`403 Unauthorized request: The role of the requester ${event.authAccountid} is ${data.role}`));
        }
      }).catch(err => {
        reject(err);
      });
    }
  });

  switch (event.op) {
    case "getSubscribers":
      // GET /api/v1/mgnt/subscribers/<surveyid>/
      // Authenticated: Yes
      authorizedJudge.then(() => {
        return subscriber.getSubscribers({
          surveyid: event.surveyid,
        });
      }).then(response => {
        // A callback handler to decide return is 304 or 200.
        if (event.ifModifiedSince && response.datetime && new Date(response.datetime).toUTCString() === event.ifModifiedSince) {
          return callback("304 Not Modified", null);
        } else {
          response.datetime = new Date(response.datetime).toUTCString();
          return callback(null, response);
        }
      }).catch(err => {
        return callback(err, null);
      });
      break;

    case "addSubscribers":
      // POST /api/v1/mgnt/subscribers/<surveyid>/
      // Authenticated: Yes
      authorizedJudge.then(() => {
        return subscriber.addSubscribers({
          surveyid: event.surveyid,
          email: event.email,
        });
      }).then(response => {
        return callback(null, response);
      }).catch(err => {
        return callback(err, null);
      });
      break;

    case "updateSubscribers":
      // PUT /api/v1/mgnt/subscribers/<surveyid>/
      // Authenticated: Yes
      authorizedJudge.then(() => {
        return subscriber.updateSubscribers({
          surveyid: event.surveyid,
          email: event.email,
        });
      }).then(response => {
        return callback(null, response);
      }).catch(err => {
        return callback(err, null);
      });
      break;

    case "deleteSubscribers":
      // DELETE /api/v1/mgnt/subscribers/<surveyid>
      // Authenticated: Yes
      authorizedJudge.then(() => {
        return subscriber.deleteSubscribers({
          surveyid: event.surveyid,
        });
      }).then(response => {
        return callback(null, response);
      }).catch(err => {
        return callback(err, null);
      });
      break;

    default:
      let error = new Error("400 Bad Request: " + JSON.stringify(event));
      return callback(error, null);
  }
};