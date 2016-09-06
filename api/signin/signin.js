'use strict';

const crypto = require('crypto');

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
  const cipher = crypto.createCipher('aes256', process.env.TOKEN_SECRET);
  let encryptedState = cipher.update(`state-${event.provider}/${new Date()}`, 'utf8', 'hex');
  encryptedState += cipher.final('hex');
  switch (event.provider) {
    case 'facebook':
      facebook.signin(providerConfig, {
        scope: 'email',
        state: encryptedState
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