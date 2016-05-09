'use strict';

function survey(aws) {

  function getUUID() {
    let uuid = require('node-uuid');
    return uuid.v1();
  };

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
   * accountid  Who created the survey
   * surveyid   The uuid of the survey
   *
   * Response:
   * Key        Description
   * accountid  Who created the survey
   * surveyid   The uuid of the survey
   * subject    The subject of the survey
   * datetime   The latest modified date time of the survey
   * survey     The details of the survey model in JSON format
   */
  this.getOneSurvey = function(event, callback) {
    let error = null,
      response = null;

    // validate parameters
    if (event.accountid && event.surveyid &&
      process.env.SERVERLESS_SURVEYTABLE) {
      let docClient = new aws.DynamoDB.DocumentClient();
      let params = {
        TableName: process.env.SERVERLESS_SURVEYTABLE,
        Key: {
          accountid: event.accountid,
          surveyid: event.surveyid
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
              surveyid: data.Item.surveyid,
              subject: data.Item.subject,
              datetime: data.Item.datetime,
              survey: data.Item.survey
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
   * surveys    An array of surveys objects (see below)
   *
   * Each object in the user array contains:
   * accountid  Who created the survey
   * surveyid   The uuid of the survey
   * subject    The subject of the survey
   * datetime   The latest modified date time of the survey
   */
  this.listSurveys = function(event, callback) {

  };

  /*
   * Parameters:
   * Key          Description
   * accountid    Who created the survey
   * subject      The subject of the survey
   * survey       The details of the survey model in JSON format
   *
   * Response:
   * Key          Description
   * accountid    Who created the survey
   * surveyid     The uuid of the survey
   * datetime     The creation date time of the survey
   */
  this.addOneSurvey = function(event, callback) {
    let error = null,
      response = null;

    // validate parameters
    if (event.accountid && event.subject && event.survey &&
      process.env.SERVERLESS_SURVEYTABLE) {
      let docClient = new aws.DynamoDB.DocumentClient();
      let surveyid = getUUID();
      let datetime = Date.now();
      let params = {
        TableName: process.env.SERVERLESS_SURVEYTABLE,
        Item: {
          accountid: event.accountid,
          surveyid: surveyid,
          subject: event.subject,
          datetime: datetime,
          survey: event.survey
        }
      };

      docClient.put(params, function(err, data) {
        if (err) {
          console.error("Unable to get an item with the request: ", JSON.stringify(params), " along with error: ", JSON.stringify(err));
          return callback(getDynamoDBError(err), null);
        } else {
          // compose response
          response = {
            accountid: event.accountid,
            datetime: datetime,
            surveyid: surveyid
          };
          return callback(null, response);
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
   * Key          Description
   * accountid    Who created the survey
   * surveyid     The uuid of the survey
   * subject      The subject of the survey
   * survey       The details of the survey model in JSON format
   *
   * Response:
   * Key          Description
   * accountid    Who created the survey
   * surveyid     The uuid of the survey
   * datetime     The creation date time of the survey
   */
  this.updateOneSurvey = function(event, callback) {

  };

  /*
   * Parameters:
   * Key          Description
   * accountid    Who created the survey
   * surveyid     The uuid of the survey
   *
   * Response:
   * None
   */
  this.deleteOneSurvey = function(event, callback) {

  };
};

module.exports = survey;