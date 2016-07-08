'use strict';

let authorize = require('./authorize');

module.exports.handler = (event, context, callback) => {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  return authorize.authorize(event, callback);
};