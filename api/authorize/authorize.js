'use strict';

// Config
let slsAuth = require('serverless-authentication');
let config = slsAuth.config;
let utils = slsAuth.utils;

// Authorize
function authorize(event, callback) {
  let providerConfig = config(event);
  // this example uses simple expiration time validation
  try {
    let data = utils.readToken(event.authorizationToken, providerConfig.token_secret);
    callback(null, utils.generatePolicy(data.id, 'Allow', event.methodArn));
  } catch (err) {
    callback('Unauthorized');
  }
}

exports = module.exports = {
  authorize: authorize
};