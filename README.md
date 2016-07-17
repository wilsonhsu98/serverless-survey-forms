# serverless-survey-forms (still under construction)

[![Serverless Framework](https://camo.githubusercontent.com/547c6da94c16fedb1aa60c9efda858282e22834f/687474703a2f2f7075626c69632e7365727665726c6573732e636f6d2f6261646765732f76332e737667)](http://www.serverless.com/)
[![Build Status](https://travis-ci.org/trendmicro/serverless-survey-forms.svg?branch=master)](https://travis-ci.org/trendmicro/serverless-survey-forms)
[![Coverage Status](https://coveralls.io/repos/github/trendmicro/serverless-survey-forms/badge.svg?branch=master)](https://coveralls.io/github/trendmicro/serverless-survey-forms?branch=master)

To create a google-style survey forms, authorized users could design surveys and collect anonymous feedbacks.

## Architecture Overview

![](http://i.imgur.com/HXk0u6O.png)

## Environment

This project depends on the following modules, please make sure they're ready after [Installation].

* NodeJS 3.7.3
* serverless 0.5.6
* aws-sdk 2.3.7
* node-uuid 1.4.7
* chai 3.5.0
* dynalite 1.0.0
* mocha 2.4.5
* istanbul 0.4.3
* serverless-authentication 0.2.2
* serverless-authentication-facebook 0.2.0
* serverless-cors-plugin 0.4.1
* serverless-client-s3 2.0.0
* serverless-meta-sync 0.1.0

To prevent from poluting your local environment, you may leverage the Vagrant file to isolate your development environment.

## Installation

The steps below can be taken to install the project and initialize it.

Open a command line terminal and cd to the location where you will be placing the serverless-survey-forms project.

Clone the project directly from Github:

```git clone https://github.com/trendmicro/serverless-survey-forms.git```

Enter the serverless-survey-form folder that was just created:

```cd serverless-survey-form```

Install npm dependency modules in serverless-survey-form:

```
npm install
```

Initialize the project and input your AWS access key and secret key:

```sls project init```

Please ignore the following possible warning:

```
> Serverless: \ Serverless: WARNING: This variable is not defined: tokenSecret  
> Serverless: WARNING: This variable is not defined: redirectClientURI  
> Serverless: WARNING: This variable is not defined: providerFacebookId  
> Serverless: WARNING: This variable is not defined: providerFacebookSecret  
> Serverless: WARNING: This variable is not defined: websiteDomainName  
> Serverless: WARNING: This variable is not defined: tokenSecret  
```

Install npm dependency modules in serverless-survey-form/api:

```
cd api
npm install
cd ..
```

Due to serverless framework [issue#1322](https://github.com/serverless/serverless/issues/1322), you would realize a lot of files have been modified after ```sls project init```.

Please **DO rollback** these modification before proceeding on the follow steps.

## CloudFront DomainName

After project initialization, the CloudFormation also create a new CloudFront distribution with two origins, the one is S3 bucket for static website resources, and the another one is API Gateway endpoint.

You should be able to access this CloudFront distributions from ```_meta/variables/s-variables-[stage]-[region].json```. ```"websiteDomainName": "https://d230j9e0u5dil1.cloudfront.net"```, for example. 

## Authentication Provider Settings

### Facebook App Id Application

Firstly, you have to apply a Facebook App Id for OAuth athentication, please follow steps in [facebook for developer](https://developers.facebook.com/docs/apps/register) to create a **Website** app. 

Please fill ```https://[cloudfront distributions]/authentication/callback``` in field **Facebook Login | Valid OAuth redirect URIs**.

Configure Facebook App as authentication provider by executing serverless CLI below:

```
$ sls variables set 
Serverless: Enter variable key to set a value to:  tokenSecret
Serverless: Enter variable value to set a value to:  your-secret-for-json-web-token
Serverless: Select variable type: 
    1) Common
    2) Stage
  > 3) Region
Serverless: Successfully set variable: tokenSecret  

$ sls variables set 
Serverless: Enter variable key to set a value to:  redirectClientURI
Serverless: Enter variable value to set a value to:  https://[cloudfront distributions]/auth/test.html
Serverless: Select variable type: 
    1) Common
    2) Stage
  > 3) Region
Serverless: Successfully set variable: redirectClientURI  

$ sls variables set 
Serverless: Enter variable key to set a value to:  providerFacebookId
Serverless: Enter variable value to set a value to:  your-facebook-app-id
Serverless: Select variable type: 
    1) Common
    2) Stage
  > 3) Region
Serverless: Successfully set variable: providerFacebookId  

$ sls variables set 
Serverless: Enter variable key to set a value to:  providerFacebookSecret
Serverless: Enter variable value to set a value to:  your-facebook-app-secret
Serverless: Select variable type: 
    1) Common
    2) Stage
  > 3) Region
Serverless: Successfully set variable: providerFacebookSecret  

```

Environmental variables are mapped in s-function.json files, for example in the signin/s-function.json.

## Static Website Resources Compilation (TBA - Chiou)

## Service Deployment

Deploy your functions, endpoints, and web client:

```
# deploy APIGW and Lambda
sls dash deploy
# enable CORS, and ignore any warning
sls endpoint deploy -a
# deploy static web resources
sls client deploy -s [stage]
```

## CloudFormation Adjustment

As aforementioned, the CloudFormation created a new CloudFront distribution with two origins, the one is S3 bucket for static website resources, and the another one is API Gateway endpoint. However there is no correct API Gateway endpoint ready at the moment, we have to adjust s-resources-cf.json and run cloud formation process again.

Please replace ```r2c5wmub95``` with new deployed API Gateway Id, and you should be able to find this from **AWS Console | API Gateway | serverless-survey-form | Stages**.

```
{
  "DomainName": "r2c5wmub95.execute-api.${region}.amazonaws.com",
  "Id": "APIGW",
  "OriginPath": "/${stage}",
  "CustomOriginConfig": {
  "HTTPPort": "80",
  "HTTPSPort": "443",
  "OriginProtocolPolicy": "match-viewer"
  }
}
```

After modification, run cloud formation process again:

```
sls resources deploy
```

For now, there is no good way to prevent this last step and it should be improved in the future.

## Unit Test

The steps below can be taken to verify the functionality.

Enter the serverless-survey-form folder the project was cloned:

```cd serverless-survey-form```

Install npm dependency modules in serverless-survey-form

```npm install```

Verify the functionality before any code commit to Git.

```npm test```

## References

* [Serverless Authentication](https://github.com/laardee/serverless-authentication-boilerplate)
* [Introducing custom authorizers in Amazon API Gateway](https://aws.amazon.com/tw/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/)
* [Single CloudFront distribution with two origins](https://github.com/boushley/awsm-cloudfront)

## License

Licensed under the [MIT License](https://github.com/trendmicro/serverless-survey-forms/blob/master/LICENSE).