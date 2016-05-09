'use strict';

function user(aws) {

  function getUUID() {
    let uuid = require('node-uuid');
    return uuid.v1();
  };
  /*
  // Convert DynamoDB error code into Error object
  function getDynamoDBError(err) {
    let error = null;

    if (err.statusCode === 400) {
      switch (err.code) {
        case "AccessDeniedException":
        case "UnrecognizedClientException":
          error = new Error("401 Unauthorized: Unable to access an item with error: " + JSON.stringify(err));
          break;
        default:
          error = new Error("400 Bad Request: Unable to access an item with error: " + JSON.stringify(err));
          break;
      }
    } else { // 500, 503
      error = new Error("500 Internal Server Error: Unable to access an item with error: " + JSON.stringify(err));
    }
    return error;
  };
*/
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