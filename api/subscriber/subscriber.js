'use strict';

let docClient;

module.exports = (aws => {
  if (!docClient && aws) {
    docClient = new aws.DynamoDB.DocumentClient();
  }

  // Convert DynamoDB error code into Error object
  const getDynamoDBError = err => {
    if (err.statusCode === 400) {
      switch (err.code) {
        case "AccessDeniedException":
        case "UnrecognizedClientException":
          return new Error("401 Unauthorized: Unable to access an item with error: " + JSON.stringify(err));
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
   * surveyid   The uuid of the survey
   *
   * Response:
   * Key        Description
   * surveyid   The uuid of the survey
   * email      email of subscriber in Array
   */
  const getSubscribers = event =>{
    let response = null;
    return new Promise((resolve, reject) => {
      // validate parameters
      if (event.surveyid && process.env.SERVERLESS_SUBSCRIBERTABLE) {
        let params = {
          TableName: process.env.SERVERLESS_SUBSCRIBERTABLE,
          Key: {
            surveyid: event.surveyid,
          },
        };

        docClient.get(params, (err, data) => {
          if (err) {
            console.error("Unable to get an item with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
            reject(getDynamoDBError(err));
          } else {
            if (data.Item) { // got response
              // compose response
              response = {
                surveyid: data.Item.surveyid,
                email: data.Item.email,
                datetime: data.Item.datetime,
              };
              resolve(response);
            } else {
              console.error("Unable to get an item with the request: ", JSON.stringify(params));
              reject(new Error("404 Not Found: Unable to get an item with the request: " + JSON.stringify(params)));
            }
          }
        });
      } else { // incomplete parameters
        reject(new Error("400 Bad Request: Missing parameters: " + JSON.stringify(event)));
      }
    });
  };

  /*
   * Parameters:
   * Key          Description
   * surveyid     The uuid of the survey
   * email        email of subscriber in Array
   *
   * Response:
   * datetime   The latest modified date time of the subscribers.
   */
  const addSubscribers = event => {
    let response = null;
    return new Promise((resolve, reject) => {
      // validate parameters
      if (event.surveyid && event.email && process.env.SERVERLESS_SUBSCRIBERTABLE) {
        let datetime = Date.now();
        let params = {
          TableName: process.env.SERVERLESS_SUBSCRIBERTABLE,
          Item: {
            surveyid: event.surveyid,
            email: event.email,
            datetime: datetime,
          },
        };

        docClient.put(params, err => {
          if (err) {
            console.error("Unable to add a new item with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
            reject(getDynamoDBError(err));
          } else {
            // compose response
            response = {
              datetime: datetime,
            };
            resolve(response);
          }
        });
      } else { // incomplete parameters
        reject(new Error("400 Bad Request: Missing parameters: " + JSON.stringify(event)));
      }
    });
  };

  /*
   * Parameters:
   * Key          Description
   * surveyid     The uuid of the survey
   * email        email of subscriber in Array
   *
   * Response:
   * email        updated emails of subscriber
   */
  const updateSubscribers = event => {
    let response = null;
    return new Promise((resolve, reject) => {
      // validate parameters
      if (event.email  && event.surveyid && process.env.SERVERLESS_SUBSCRIBERTABLE) {
        let params = {
          TableName: process.env.SERVERLESS_SUBSCRIBERTABLE,
          Key: {
            surveyid: event.surveyid,
          },
          UpdateExpression: "set email=:email",
          ExpressionAttributeValues: {
            ":email": event.email,
          },
          ConditionExpression: "(attribute_exists(surveyid))",
          ReturnValues: "UPDATED_NEW",
        };

        docClient.update(params, (err, data) => {
          if (err) {
            if (err.code === "ConditionalCheckFailedException") {
              console.error("Unable to update subscribers with the request: ", JSON.stringify(params));
              reject(new Error("404 Not Found: Unable to update an not exist item with the request: " + JSON.stringify(params)));
            } else {
              console.error("Unable to update subscribers with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
              reject(getDynamoDBError(err));
            }
          } else {
            // compose response
            response = {
              email: data.Attributes.email,
            };
            resolve(response);
          }
        });
      } else { // incomplete parameters
        reject(new Error("400 Bad Request: Missing parameters: " + JSON.stringify(event)));
      }
    });
  };

  /*
   * Parameters:
   * Key          Description
   * surveyid     The uuid of the survey
   *
   * Response:
   * None
   */
  const deleteSubscribers = event => {
    return new Promise((resolve, reject) => {
      // validate parameters
      if (event.surveyid && process.env.SERVERLESS_SUBSCRIBERTABLE) {
        let params = {
          TableName: process.env.SERVERLESS_SUBSCRIBERTABLE,
          Key: {
            surveyid: event.surveyid,
          },
        };
        docClient.delete(params, err => {
          if (err) {
            console.error("Unable to delete an item with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
            reject(getDynamoDBError(err));
          } else {
            resolve({}); // Response will be an HTTP 200 with no content.
          }
        });
      } else { // incomplete parameters
        reject(new Error("400 Bad Request: Missing parameters: " + JSON.stringify(event)));
      }
    });
  };

  return {
    getSubscribers,
    addSubscribers,
    updateSubscribers,
    deleteSubscribers,
  };
});