# After first deployment

## Sync meta to S3 regularly

The project enabled plugin [serverless-meta-sync](https://github.com/serverless/serverless-meta-sync) to sync meta data across teams via S3 bucket.

When you run it with a stage or a region ```-s dev -r ap-northeast-1```, this plugin will first find or create an S3 bucket using the credentials you have set for that stage, then sync the variables files you have locally with the ones on the S3 bucket. For example, running ```sls meta sync -s dev``` will sync your project's s-variables-dev.json with the s-variables-dev.json located on the S3 bucket.

You should regularly sync meta in these two conditions:

* Right after project initialization.
* Everytime you set variables to meta.

## Modify to s-resources-cf.json

If you add any new resource.

* Execute ```sls resources deploy```.
* Additionally you have to configure **Forward Headers** in CloudFront, please refer to detailed [instructions](issue1589.md).

## Modify to s-function.json

If you add any new API endpoint.

* Execute ```sls endpoint deploy -a```.

## Modify to Lambda functions

If you add any new Lambda function.

* Execute ```sls function deploy```.