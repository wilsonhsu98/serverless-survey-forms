'use strict';

let callback = require('./callback');

module.exports.handler = (event, context, _callback) => {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  return callback.callback(event, _callback);
};