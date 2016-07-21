'use strict';

let aws = require('../config/aws');
let user = require('./user');
user.initAWS(aws);

module.exports.handler = function(event, context, callback) {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  // todo use Promise to authorize.
  user.getOneUser({
    accountid: event.authAccountid
  }, function(err, data) {
    if (err) {
      return callback(err, null);
    } else {
        if (data.role=="admin"){

        } else {
          return (new Error("403 Unauthorized request"), null);
        }
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
    case "listUsers":
      // GET /api/v1/mgnt/users/[?startKey=<startKey>]
      // Authenticated: Yes, params: authAccountid
      // TODO: invoke listUsers once authentication is implemented and enabled
      return user.listUsers({
        startKey : event.startKey,
      }, cacheCallback);
      break;
    case "updateOneUser":
      // PUT /api/v1/mgnt/users/
      // Authenticated: Yes, params: authAccountid
      // TODO: invoke updateOneUser once authentication is implemented and enabled
      return user.updateOneUser({
        accountid: event.accountid,
        username: event.username,
        email: event.email,
        role: event.role
      }, cacheCallback);
      break;
    case "deleteOneUser":
      // DELETE /api/v1/mgnt/users/<accountid>
      // Authenticated: Yes, params: authAccountid
      // TODO: invoke deleteOneUser once authentication is implemented and enabled
      return user.deleteOneUser({
        "accountid": event.accountid
      }, cacheCallback);
      break;
    default:
      let error = new Error("400 Bad Request: " + JSON.stringify(event));
      return callback(error, null);
  }

};