'use strict';

// Config
let slsAuth = require('serverless-authentication');
let config = slsAuth.config;
let utils = slsAuth.utils;

// Providers
let facebook = require('serverless-authentication-facebook');

// Callback switch
function callback(event, _callback) {
  let providerConfig = config(event);

  let handleResponse = (err, profile, state) => {
    if (err) {
      utils.errorResponse({
        error: 'Unauthorized'
      }, providerConfig, callback);
    } else if (state !== 'state-' + profile.provider) {
      // here you should compare if the state returned from provider exist in dynamo db
      // and then expire it
      utils.errorResponse({
        error: 'State mismatch'
      }, providerConfig, _callback);
    } else {
      let id = profile.provider + '-' + profile.id;

      // here can be checked if user exist in db and update properties pr if not, create new etc.
      // profile class: https://github.com/laardee/serverless-authentication/blob/master/src/profile.js
      // sets 1 minute expiration time as an example

      let tokenData = {
        payload: {
          id: id,
          name: profile.name,
          email: profile.email
        },
        options: {
          expiresIn: 60
        }
      };
      console.log("id:", id);
      console.log("profile:", profile);
      console.log("tokenData:", tokenData);
      utils.tokenResponse(tokenData, providerConfig, _callback);
    }
  };

  switch (event.provider) {
    case 'facebook':
      facebook.callback(event, providerConfig, handleResponse);
      break;
    default:
      utils.errorResponse({
        error: 'Invalid provider'
      }, providerConfig, _callback);
  }
}

exports = module.exports = {
  callback: callback
};