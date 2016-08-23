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
    console.log("Decrypted data: " + JSON.stringify(data));

    let methodArn = event.methodArn.replace(/(GET|POST|PUT|DELETE)/g, '*').replace(/mgnt.+/g, 'mgnt/*');

    console.log(`Change methodArn to: ${methodArn}`);

    // TODO: handle expiration time validation
    callback(null, utils.generatePolicy(
      data.id, // which is $context.authorizer.principalId
      'Allow',
      methodArn));
  } catch (err) {
    console.log(err);
    callback('Unauthorized');
  }
}

exports = module.exports = {
  authorize: authorize
};