module.exports = function(aws) {

  return {
    // loosely couple with AWS instance
    _aws : aws,

    getUUID : function() {
      var uuid = require('node-uuid');
      return uuid.v1();
    },

    // Convert DynamoDB error code into Error object
    getDynamoDBError : function(err) {
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
      }
      else {  // 500, 503
        error = new Error("500 Internal Server Error: Unable to access an item with error: " + JSON.stringify(err));
      }
      return error;
    },

    getOneSurvey : function(event, callback) {

    },

    listSurveys : function(event, callback) {

    },

    /*
     * Parameters:
     * Key          Description
     * requester    The requester accountid.
     * subject      The subject of the survey
     * survey       The details of the survey model in JSON format
     *
     * Response:
     * Key          Description
     * accountid    Who created the survey
     * datetime     The creation date time of the survey
     * surveyid     The uuid of the survey
     */
    addOneSurvey : function(event, callback) {
      var error = null;
      var response = 'addOneSurvey not implement yet.';

      // validate parameters
      if (event.requester && event.subject && event.survey && 
        process.env.SERVERLESS_SURVEYTABLE) {
        var docClient = new this._aws.DynamoDB.DocumentClient();
        var surveyid = this.getUUID();
        var datetime = Date.now();
        var params = {
          TableName: process.env.SERVERLESS_SURVEYTABLE,
          Item: {
            accountid: event.requester,
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
            error = this.getDynamoDBError(err);
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
    },

    updateOneSurvey : function(event, callback) {

    },

    deleteOneSurvey : function(event, callback) {

    }
  };
};