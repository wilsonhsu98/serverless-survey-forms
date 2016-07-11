'use strict';

let signin = require('./signin');

module.exports.handler = (event, context, callback) => {
  // request from API Gateway
  console.log("Dispatch request from API Gateway: ", JSON.stringify(event));

  return signin.signin(event, callback);
};