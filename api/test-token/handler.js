'use strict';

// User model
let aws = require('../config/aws');
let user = require('../user/user');

module.exports.handler = (event, context, callback) => {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  user.initAWS(aws);
  user.getOneUser({
    accountid: event.authAccountid
  }, function(err, data) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, {
        id: data.accountid,
        username: data.username,
        email: data.email,
        role: data.role
      });
    }
  });

};