function survey(aws) {

  function getUUID() {
    var uuid = require('node-uuid');
    return uuid.v1();
  }

  // Convert DynamoDB error code into Error object
  function getDynamoDBError(err) {
    var error = null;

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
  }

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
    var error = null;
    var response = 'getOneSurvey not implement yet.';

    // validate parameters
    if (event.accountid && event.surveyid &&
      process.env.SERVERLESS_SURVEYTABLE) {
      var docClient = new aws.DynamoDB.DocumentClient();
      var params = {
        TableName: process.env.SERVERLESS_SURVEYTABLE,
        Key: {
          accountid: event.accountid,
          surveyid: event.surveyid
        }
      };
      console.log("Getting an item: ", JSON.stringify(params));

      docClient.get(params, function(err, data) {
        if (err) {
          console.error("Unable to get an item with error: ", JSON.stringify(err));
          // compose error response
          error = getDynamoDBError(err);
          return callback(error, null);
        } else {
          console.log("Got an item with return data: ", JSON.stringify(data));
          // compose response
          response = {
            accountid: data.Item.accountid,
            surveyid: data.Item.surveyid,
            subject: data.Item.subject,
            datetime: data.Item.datetime,
            survey: data.Item.survey
          };
          return callback(null, response);
        }
      });
    }
    // incomplete parameters
    else {
      error = new Error("400 Bad Request: Missing parameters: " + JSON.stringify(event));
      return callback(error, null);
    }
  }

  this.listSurveys = function(event, callback) {

  }

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
   * datetime     The creation date time of the survey
   * surveyid     The uuid of the survey
   */
  this.addOneSurvey = function(event, callback) {
    var error = null;
    var response = 'addOneSurvey not implement yet.';

    // validate parameters
    if (event.accountid && event.subject && event.survey &&
      process.env.SERVERLESS_SURVEYTABLE) {
      var docClient = new aws.DynamoDB.DocumentClient();
      var surveyid = getUUID();
      var datetime = Date.now();
      var params = {
        TableName: process.env.SERVERLESS_SURVEYTABLE,
        Item: {
          accountid: event.accountid,
          surveyid: surveyid,
          subject: event.subject,
          datetime: datetime,
          survey: event.survey
        }
      };
      console.log("Adding a new item: ", JSON.stringify(params));

      docClient.put(params, function(err, data) {
        if (err) {
          console.error("Unable to add a new item with error: ", JSON.stringify(err));
          // compose error response
          error = getDynamoDBError(err);
          return callback(error, null);
        } else {
          console.log("Added a new item with return data: ", JSON.stringify(data));
          // compose response
          response = {
            accountid: event.requester,
            datetime: datetime,
            surveyid: surveyid
          };
          return callback(null, response);
        }
      });
    }
    // incomplete parameters
    else {
      error = new Error("400 Bad Request: Missing parameters: " + JSON.stringify(event));
      return callback(error, null);
    }
  }

  this.updateOneSurvey = function(event, callback) {

  }

  this.deleteOneSurvey = function(event, callback) {

  }
}

module.exports = survey;
