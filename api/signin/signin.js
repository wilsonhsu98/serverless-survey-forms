'use strict';

// Config
let slsAuth = require('serverless-authentication');
let config = slsAuth.config;
let utils = slsAuth.utils;

// Providers
let facebook = require('serverless-authentication-facebook');

// Signin switch
function signin(event, callback) {
  let providerConfig = config(event);
  // This is just a demo state, in real application you could
  // create a hash and save it to dynamo db and then compare it
  // in the callback
  let state = 'state-' + event.provider;

  switch (event.provider) {
    case 'facebook':
      facebook.signin(providerConfig, {
        scope: 'email',
        state: state
      }, callback);
      break;
    default:
      utils.errorResponse({
        error: 'Invalid provider'
      }, providerConfig, callback);
  }
}

exports = module.exports = {
  signin: signin
};