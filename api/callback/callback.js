'use strict';

// User model
let aws = require('../config/aws');
let user = require('../user/user');

// Config
let slsAuth = require('serverless-authentication');
let config = slsAuth.config;
let utils = slsAuth.utils;
const crypto = require('crypto');
// Providers
let facebook = require('serverless-authentication-facebook');

// Callback switch
function callback(event, _callback) {
  let providerConfig = config(event);

  let handleResponse = (err, profile, state) => {
    if (err) {
      utils.errorResponse({
        error: 'Unauthorized'
      }, providerConfig, _callback);
    } else if (state !== 'state-' + profile.provider) {
      // here you should compare if the state returned from provider exist in dynamo db
      // and then expire it
      utils.errorResponse({
        error: 'State mismatch'
      }, providerConfig, _callback);
    } else {
      const hmac = crypto.createHmac('sha256', process.env.TOKEN_SECRET); // Secret key is same as tokenSecret in s-variables.
      let id = profile.provider + '-' + hmac.update(profile.id).digest('hex');
      let tokenData = {
        payload: {
          id: id,
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
          userid: profile.id
        },
        options: {
          expiresIn: '1h'   // By rauchg/ms.js
        }
      };

      // here can be checked if user exist in db and update properties or if not, create new etc.
      user.initAWS(aws);
      user.getOneUser({
        accountid: id
      }, function(err, data) {
        if (err) {
          if (err.message.match(/404 Not Found:/gi)) {
            let parms = {
              accountid: id,
              username: profile.name,
              email: profile.email,
              role: "User"
            };
            user.countUser({},(err, response) => {
              if (err) {
                utils.errorResponse({
                  error: err
                }, providerConfig, _callback);
              } else {
                parms['role'] = (response['Count'] === 0) ? "Admin" : "User"; // First user set role to Admin
                // create new
                user.addOneUser(parms, function(err, data) {
                  if (err) {
                    utils.errorResponse({
                      error: err
                    }, providerConfig, _callback);
                  } else {
                    utils.tokenResponse(tokenData, providerConfig, _callback);
                  }
                })
              }
            });
          } else {
            utils.errorResponse({
              error: err
            }, providerConfig, _callback);
          }
        } else {
          // update properties if needed
          utils.tokenResponse(tokenData, providerConfig, _callback);
        }
      });
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