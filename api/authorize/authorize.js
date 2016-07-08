'use strict';

// Config
let slsAuth = require('serverless-authentication');
let config = slsAuth.config;
let utils = slsAuth.utils;

// Authorize
function authorize(event, callback) {
  let providerConfig = config(event);
  try {
    let data = utils.readToken(event.authorizationToken, providerConfig.token_secret);
    console.log("Decrypted data: " + data);
    // TODO: handle expiration time validation
    callback(null, utils.generatePolicy(
      data.id, // which is $context.authorizer.principalId
      'Allow',
      event.methodArn));
  } catch (err) {
    callback('Unauthorized');
  }
}

exports = module.exports = {
  authorize: authorize
};