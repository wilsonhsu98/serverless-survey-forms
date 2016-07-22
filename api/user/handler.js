'use strict';

let aws = require('../config/aws');
let user = require('./user');
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
    case "me":
      return user.getOneUser({
        accountid: event.authAccountid
      }, cacheCallback);
      break;
    case "listUsers":
      // GET /api/v1/mgnt/users/[?startKey=<startKey>]
      // Authenticated: Yes
      return authorizedJudge.then(() => {
        user.listUsers({
          startKey : event.startKey,
        }, cacheCallback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;
    case "updateOneUser":
      // PUT /api/v1/mgnt/users/
      // Authenticated: Yes
      return authorizedJudge.then(() => {
        user.updateOneUser({
          accountid: event.accountid,
          username: event.username,
          email: event.email,
          role: event.role
        }, cacheCallback);
      }).catch( (err) => {
        callback(err, null);
      });
      break;
    case "deleteOneUser":
      // DELETE /api/v1/mgnt/users/<accountid>
      // Authenticated: Yes
      return authorizedJudge.then(() => {
        user.deleteOneUser({
          "accountid": event.accountid
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