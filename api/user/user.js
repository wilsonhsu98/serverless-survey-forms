'use strict';

function user(aws) {

  // Convert DynamoDB error code into Error object
  function getDynamoDBError(err) {
    if (err.statusCode === 400) {
      switch (err.code) {
        case "AccessDeniedException":
        case "UnrecognizedClientException":
          return new Error("401 Unauthorized: Unable to access an item with error: " + JSON.stringify(err));
          break;
        default:
          return new Error("400 Bad Request: Unable to access an item with error: " + JSON.stringify(err));
      }
    } else { // 500, 503
      return new Error("500 Internal Server Error: Unable to access an item with error: " + JSON.stringify(err));
    }
  };

  /*
   * Parameters:
   * Key        Description
   * accountid  accountid with authentication provider as prefix or default system ${project}-${stage}-admin
   *
   * Response:
   * Key        Description
   * accountid  accountid with authentication provider as prefix or default system ${project}-${stage}-admin
   * username   User name from authentication provider or "admin" for ${project}-${stage}-admin
   * email      Email from authentication provider or sha2 of password for ${project}-${stage}-admin
   * role       Default role is "User" when a user grants permission to the system.
   */
  this.getOneUser = function(event, callback) {

  };

  /*
   * Parameters:
   * Key        Description
   * startKey   If your query amount to more than 1 MB of data, you'll need to perform another query request for the next 1 MB of data.
   *            To do this, take the lastEvaluatedKey value from the previous request, and use that value as the startKey in the next request.
   *            This approach will let you progressively query for new data in 1 MB increments.
   *
   * Response:
   * Key        Description
   * users      An array of users objects (see below)
   *
   * Each object in the user array contains:
   * accountid  accountid with authentication provider as prefix or default system ${project}-${stage}-admin
   * username   User name from authentication provider or "admin" for ${project}-${stage}-admin
   * email      Email from authentication provider or sha2 of password for ${project}-${stage}-admin
   * role       Default role is "User" when a user grants permission to the system.
   */
  this.listUsers = function(event, callback) {

  };

  /*
   * Parameters:
   * Key        Description
   * accountid  accountid with authentication provider as prefix or default system ${project}-${stage}-admin
   * username   User name from authentication provider or "admin" for ${project}-${stage}-admin
   * email      Email from authentication provider or sha2 of password for ${project}-${stage}-admin
   *
   * Response:
   * None
   */
  this.addOneUser = function(event, callback) {
    // validate parameters
    if (event.accountid && event.username && event.email &&
      process.env.SERVERLESS_USERTABLE) {
      let docClient = new aws.DynamoDB.DocumentClient();
      let params = {
        TableName: process.env.SERVERLESS_USERTABLE,
        Item: {
          accountid: event.accountid,
          username: event.username,
          email: event.email
        }
      };

      docClient.put(params, function(err, data) {
        if (err) {
          console.error("Unable to add a new user with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
          return callback(getDynamoDBError(err), null);
        } else {
          return callback(null, {});
        }
      });
    }
    // incomplete parameters
    else {
      return callback(new Error("400 Bad Request: Missing parameters: " + JSON.stringify(event)), null);
    }
  };

  /*
   * Parameters:
   * Key        Description
   * accountid  accountid with authentication provider as prefix or default system ${project}-${stage}-admin
   * username   User name from authentication provider or "admin" for ${project}-${stage}-admin
   * email      Email from authentication provider or sha2 of password for ${project}-${stage}-admin
   *
   * Response:
   * None
   */
  this.updateOneUser = function(event, callback) {

  };

  /*
   * Parameters:
   * Key        Description
   * accountid  accountid with authentication provider as prefix or default system ${project}-${stage}-admin
   *
   * Response:
   * None
   */
  this.deleteOneUser = function(event, callback) {

  };
};

module.exports = user;