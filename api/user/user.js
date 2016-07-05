'use strict';

module.exports = (() => {
  let aws = null;

  const initAWS = (AWS) => {
    aws = AWS;
  };

  // Convert DynamoDB error code into Error object
  const getDynamoDBError = (err) => {
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
  // todo This is for authentication not for api gateway.
  const getOneUser = (event, callback) => {
    let response = null;
    // validate parameters
    if (event.accountid && process.env.SERVERLESS_SURVEYTABLE) {
      let docClient = new aws.DynamoDB.DocumentClient();
      let params = {
        TableName: process.env.SERVERLESS_USERTABLE,
        Key: {
          accountid: event.accountid,
        }
      };

      docClient.get(params, function(err, data) {
        if (err) {
          console.error("Unable to get an item with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
          return callback(getDynamoDBError(err), null);
        } else {
          if (data.Item) { // got response
            // compose response
            response = {
              accountid: data.Item.accountid,
              username: data.Item.username,
              email: data.Item.email,
              role: data.Item.role,
            };
            return callback(null, response);
          } else {
            console.error("Unable to get an item with the request: ", JSON.stringify(params));
            return callback(new Error("404 Not Found: Unable to get an item with the request: " + JSON.stringify(params)), null);
          }
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
  const listUsers = (event, callback) => {
    let response = null;
    // validate parameters
    if (process.env.SERVERLESS_USERTABLE) {
      let docClient = new aws.DynamoDB.DocumentClient();
      let params = {
        TableName: process.env.SERVERLESS_USERTABLE,
        ProjectionExpression: "accountid, username, email, role",
        KeyConditionExpression: "accountid = :accountId",
        ExpressionAttributeValues: {
          ":accountId": event.accountid,
        },
      };

      // continue querying if we have more data
      if (event.startKey){
        params.ExclusiveStartKey = event.startKey;
      }
      // turn on the limit in testing mode
      if (event.limitTesting){
        params.Limit = 1;
      }

      docClient.query(params, function(err, data) {
        if (err) {
          console.error("Unable to get an item with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
          return callback(getDynamoDBError(err), null);
        } else {
          // got response
          // compose response
          response = {};
          response['users'] = data.Items;

          // LastEvaluatedKey
          if(typeof data.LastEvaluatedKey != "undefined"){
            response['LastEvaluatedKey'] = data.LastEvaluatedKey;
          }
          return callback(null, response);
        }
      });
    }
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
  const addOneUser = (event, callback) => {
    // validate parameters
    if (event.accountid && event.username && event.email && event.role &&
      process.env.SERVERLESS_USERTABLE) {
      let docClient = new aws.DynamoDB.DocumentClient();
      let params = {
        TableName: process.env.SERVERLESS_USERTABLE,
        Item: {
          accountid: event.accountid,
          username: event.username,
          email: event.email,
          role: event.role
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
  const updateOneUser = (event, callback) => {

  };

  /*
   * Parameters:
   * Key        Description
   * accountid  accountid with authentication provider as prefix or default system ${project}-${stage}-admin
   *
   * Response:
   * None
   */
  const deleteOneUser = (event, callback) => {

  };



  return {
    initAWS: initAWS,

    getOneUser : getOneUser,
    listUsers : listUsers,

    addOneUser : addOneUser,
    updateOneUser : updateOneUser,

    deleteOneUser: deleteOneUser,
  }
})();